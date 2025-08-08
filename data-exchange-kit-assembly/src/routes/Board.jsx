import React, { useMemo, useState, useEffect } from 'react'
import Header from '../components/Header'
import Grid from '../components/Grid'
import Sticker from '../components/Sticker'
import { ITEMS } from '../game/kitData'
import { scoreBuild } from '../game/combos'

export default function Board() {
  const [picked, setPicked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('picked')||'[]') } catch { return [] }
  })
  const [energy, setEnergy] = useState({})
  const { total, achievements } = useMemo(() => scoreBuild(picked), [picked])

  useEffect(() => {
    const e = {}
    for (let i=0;i<20;i++) {
      const x = Math.floor( Math.random()*48 )
      const y = Math.floor( Math.random()*24 )
      e[`${x},${y}`] = Math.floor(Math.random()*4)
    }
    // extra bias if user already picked things (demo)
    picked.forEach((_,i)=>{ e[`${(i*2)%48},${(i*3)%24}`] = 4 })
    setEnergy(e)
  }, [picked])

  // Cycle random highlights
  const [highlightIdx, setHighlightIdx] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=> setHighlightIdx(i => (i+1)%ITEMS.length), 2000)
    return ()=> clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <Header />
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <Grid cols={48} rows={24} cellSize={14} energyMap={energy} />
            <div className="text-slate-300 text-sm">Board animates independently; it reflects local selections to add flair.</div>
          </div>
          <div>
            <div className="rounded-2xl border border-slate-800 p-4 bg-slate-900/40">
              <div className="text-lg font-semibold mb-2">Trending Kit</div>
              <div className="grid grid-cols-2 gap-2">
                {ITEMS.slice(highlightIdx, highlightIdx+6).map(i => (
                  <div key={i.id} className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/60 text-sm">{i.name}</div>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-lg font-semibold mb-2">Achievements Preview</div>
                <div className="flex flex-wrap">
                  {achievements.slice(0,6).map((a,idx)=> <Sticker key={idx} text={a.name} bonus={!!a.bonus} />)}
                </div>
                <div className="text-slate-400 text-xs">Based on your local picks; no server required.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
