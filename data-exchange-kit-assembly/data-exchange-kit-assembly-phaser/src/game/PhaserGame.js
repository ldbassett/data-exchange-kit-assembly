import Phaser from 'phaser'
import { ITEMS, RECIPES, TIME_TOKENS } from './data'

const rand = (min, max) => Math.floor(Math.random()*(max-min+1))+min

export default class KitScene extends Phaser.Scene {
  constructor(){
    super('KitScene')
    this.state = { timeLeft:120, inventory:new Set(), score:0, crafted:[], muted:false }
  }
  create(){
    this.cameras.main.setBackgroundColor('#0b1220')
    this.rooms = this._genRooms()
    this._drawWorld()

    // physics bounds
    this.worldW = 1400; this.worldH = 1000
    this.physics.world.setBounds(0,0,this.worldW,this.worldH)

    // player
    this.player = this.add.rectangle(0,0,18,18,0xffffff).setOrigin(0.5)
    this.playerFill = this.add.rectangle(0,0,12,12,0x1f6feb).setOrigin(0.5)
    this.physics.add.existing(this.player)
    this.player.body.setCollideWorldBounds(true).setSize(16,16)
    const spawn = this.rooms[0].center
    this.player.setPosition(spawn.x, spawn.y); this.playerFill.setPosition(spawn.x, spawn.y)
    this.playerSpeed = 220

    // walls collide
    this.blockers = this.physics.add.staticGroup(this.wallRects.map(r => this.add.rectangle(r.x+r.w/2, r.y+r.h/2, r.w, r.h, 0x0).setAlpha(0)))
    this.physics.add.collider(this.player, this.blockers)

    // items + tokens
    this.items = this.physics.add.group()
    const spots = this._spots(ITEMS.length + TIME_TOKENS.length)
    ITEMS.forEach((item, i)=>{
      const p = spots[i]; const s = this.add.rectangle(p.x,p.y,14,14,0xffd200).setStrokeStyle(2,0x1f6feb)
      s.setData('type','item'); s.setData('id', item.id); s.setData('name', item.name)
      this.physics.add.existing(s,true); this.items.add(s)
    })
    TIME_TOKENS.forEach((t,k)=>{
      const p = spots[ITEMS.length+k]
      const s = this.add.star(p.x,p.y,5,5,9,0xfff7ae).setStrokeStyle(2,0xffd200)
      s.setData('type','token'); s.setData('seconds', t.seconds)
      this.physics.add.existing(s,true); this.items.add(s)
    })
    this.physics.add.overlap(this.player, this.items, (_,obj)=> this._pickup(obj))

    // HUD
    this._hud()

    // controls
    this.keys = this.input.keyboard.addKeys('W,A,S,D')
    this._joystick()

    // timer
    this.ticker = this.time.addEvent({ delay:1000, loop:true, callback:()=>{
      this.state.timeLeft--; if (this.state.timeLeft<=0) this._timeout(); this._hudUpdate(); if(!this.state.muted) this._beep(220,0.02)
    }})

    // craft CTA
    this._craftFab()

    // camera
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12)
    this.cameras.main.setBounds(0,0,this.worldW,this.worldH)
  }

  update(){
    const v = {x:0,y:0}
    if (this.keys.A.isDown) v.x -= 1
    if (this.keys.D.isDown) v.x += 1
    if (this.keys.W.isDown) v.y -= 1
    if (this.keys.S.isDown) v.y += 1
    if (this.joyVec){ v.x += this.joyVec.x; v.y += this.joyVec.y }
    const len = Math.hypot(v.x,v.y) || 1
    this.player.body.setVelocity((v.x/len)*this.playerSpeed, (v.y/len)*this.playerSpeed)
    this.playerFill.setPosition(this.player.x, this.player.y)

    const avail = this._available()
    if (avail.length>0) this._fabShow(avail[0].name); else this._fabHide()
  }

  // world generation
  _genRooms(){
    const n = rand(2,3), rooms = []; let x=80,y=120
    for (let i=0;i<n;i++){
      const w=rand(380,480), h=rand(280,360)
      rooms.push({x,y,w,h,center:{x:x+w/2,y:y+h/2}}); x+=w+80; if (i===0 && n===3) y+=rand(-40,40)
    }
    this.corridors = []
    for (let i=0;i<n-1;i++){ const a=rooms[i].center,b=rooms[i+1].center
      const midx=Math.min(a.x,b.x), maxx=Math.max(a.x,b.x)
      this.corridors.push({x:midx, y:a.y-24, w:(maxx-midx), h:48})
    }
    return rooms
  }
  _drawWorld(){
    this.wallRects = []
    const bg = this.add.graphics(); bg.fillStyle(0x0b1220,1); bg.fillRect(0,0,1600,1200)
    this.rooms.forEach(r=> this._tileRect(r.x,r.y,r.w,r.h,0x10203a,0x1f6feb))
    this.corridors.forEach(c=> this._tileRect(c.x,c.y,c.w,c.h,0x0f1d35,0x3556a8))
    // walls (borders)
    const wall = (x,y,w,h)=> this.wallRects.push({x,y,w,h})
    this.rooms.forEach(r=>{ wall(r.x-8,r.y-8,r.w+16,8); wall(r.x-8,r.y+r.h,r.w+16,8); wall(r.x-8,r.y,8,r.h); wall(r.x+r.w,r.y,8,r.h) })
  }
  _tileRect(x,y,w,h,base,accent){
    const g=this.add.graphics(); g.fillStyle(base,1); g.fillRect(x,y,w,h)
    g.lineStyle(1,0xffffff,0.08)
    for(let i=x;i<x+w;i+=24) g.lineBetween(i,y,i,y+h)
    for(let j=y;j<y+h;j+=24) g.lineBetween(x,j,x+w,j)
    const a=this.add.graphics(); a.fillStyle(accent,0.15)
    a.fillRect(x+6,y+6,18,18); a.fillRect(x+w-24,y+6,18,18); a.fillRect(x+6,y+h-24,18,18); a.fillRect(x+w-24,y+h-24,18,18)
  }
  _spots(n){
    const rects = this.rooms.concat(this.corridors), spots=[]
    while(spots.length<n){
      const r = rects[rand(0,rects.length-1)]
      const px = rand(r.x+30, r.x+r.w-30), py = rand(r.y+30, r.y+r.h-30)
      spots.push({x:px,y:py})
    }
    return spots
  }

  // HUD
  _hud(){
    this.hud = document.createElement('div')
    this.hud.className = 'hud'
    this.hud.innerHTML = `<div class="pill">⏱ <span id="time">120</span>s</div>
      <div class="pill">⭐ <span id="score">0</span></div>
      <div class="pill">🎒 <span id="inv">0</span>/12</div>
      <button id="mute" class="pill">🔊</button>`
    this.game.canvas.parentNode.appendChild(this.hud)
    this.hud.querySelector('#mute').onclick=()=>{
      this.state.muted=!this.state.muted
      this.hud.querySelector('#mute').textContent=this.state.muted?'🔇':'🔊'
    }
    this._hudUpdate()
  }
  _hudUpdate(){
    this.hud.querySelector('#time').textContent=this.state.timeLeft
    this.hud.querySelector('#score').textContent=this.state.score
    this.hud.querySelector('#inv').textContent=this.state.inventory.size
  }

  // joystick
  _joystick(){
    const wrap=document.createElement('div')
    wrap.className='joy-wrap'; wrap.innerHTML='<div class="joy-base"></div><div class="joy-stick" id="stick"></div>'
    this.game.canvas.parentNode.appendChild(wrap)
    const stick=wrap.querySelector('#stick'); let dragging=false
    const move=(e)=>{
      const r=wrap.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2
      const dx=e.clientX-cx, dy=e.clientY-cy, max=48, mag=Math.hypot(dx,dy)||1
      const nx=(dx/mag)*min(mag,max), ny=(dy/mag)*min(mag,max)
      function min(a,b){return a<b?a:b}
      stick.style.left=`${50+(nx/max)*50}%`; stick.style.top=`${50+(ny/max)*50}%`
      this.joyVec={x:nx/max,y:ny/max}
    }
    wrap.addEventListener('pointerdown', e=>{dragging=true; wrap.setPointerCapture(e.pointerId); move(e)})
    wrap.addEventListener('pointermove', e=> dragging && move(e))
    wrap.addEventListener('pointerup', ()=>{dragging=false; this.joyVec=null; stick.style.left='50%'; stick.style.top='50%'})
  }

  // craft button
  _craftFab(){
    this.fab = document.createElement('button')
    this.fab.className='fab hidden'
    this.fab.onclick=()=> this._craft()
    this.game.canvas.parentNode.appendChild(this.fab)
  }
  _available(){
    const inv = Array.from(this.state.inventory)
    return RECIPES.filter(r => r.items.every(id => inv.includes(id)))
  }
  _fabShow(name){
    this.fab.textContent = `Craft: ${name}`
    this.fab.classList.remove('hidden')
  }
  _fabHide(){ this.fab.classList.add('hidden') }
  _craft(){
    const list=this._available(); if (!list.length) return
    const r=list[0]
    this.state.score += r.points
    this.state.crafted.push(r.name)
    if (!this.state.muted){ this._beep(523,0.05); this._beep(659,0.05); this._beep(784,0.06) }
    const pop=this.add.text(this.player.x,this.player.y-24,`✓ ${r.name} +${r.points}`,{color:'#1f6feb', backgroundColor:'#ffffff22', padding:{x:6,y:4}}).setOrigin(0.5)
    this.tweens.add({targets:pop, y:pop.y-40, alpha:0, duration:900, onComplete:()=>pop.destroy()})
    this._hudUpdate()
  }

  // pickups
  _pickup(obj){
    const type=obj.getData('type')
    if (type==='item'){
      const id=obj.getData('id'); if (!this.state.inventory.has(id)){
        this.state.inventory.add(id); obj.destroy(); if(!this.state.muted){ this._beep(880,0.06); this._cowbell() } this._hudUpdate()
      }
    } else if (type==='token'){
      const s=obj.getData('seconds'); this.state.timeLeft+=s; obj.destroy()
      if (!this.state.muted) this._beep(660,0.06)
      const t=this.add.text(this.player.x,this.player.y-18,`+${s}s`,{color:'#ffd200'}).setOrigin(0.5)
      this.tweens.add({targets:t, y:t.y-28, alpha:0, duration:700, onComplete:()=>t.destroy()})
      this._hudUpdate()
    }
  }

  // timeout
  _timeout(){
    this.ticker.remove()
    const overlay=document.createElement('div'); overlay.className='report'
    const list=this.state.crafted.length? `<ul>${this.state.crafted.map(n=>`<li>• ${n}</li>`).join('')}</ul>` : '<div>No tasks completed… this time.</div>'
    overlay.innerHTML=`<div class="card">
      <div class="text-xl font-semibold mb-2">Report Card</div>
      <div class="mb-1">Score: <b>${this.state.score}</b></div>
      <div class="mb-2">Combos: ${this.state.crafted.length}</div>
      <div class="mb-3">${list}</div>
      <div class="text-xs text-slate-300">New run in 7 seconds…</div>
    </div>`
    this.game.canvas.parentNode.appendChild(overlay)
    this.time.delayedCall(7000, ()=> window.location.reload())
  }

  // audio
  _beep(freq=440, dur=0.05){
    try{
      const ctx = this.sound.context || new (window.AudioContext||window.webkitAudioContext)()
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type='square'; o.frequency.value=freq; o.connect(g); g.connect(ctx.destination)
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime+0.01)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+dur)
      o.start(); o.stop(ctx.currentTime+dur+0.01)
    }catch{}
  }
  _cowbell(){
    try{
      const ctx = this.sound.context || new (window.AudioContext||window.webkitAudioContext)()
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type='triangle'; o.frequency.value=650; o.connect(g); g.connect(ctx.destination)
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime+0.005)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.08)
      o.start(); o.stop(ctx.currentTime+0.09)
    }catch{}
  }
}
