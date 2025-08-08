import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import KitScene from '../game/PhaserGame'

export default function Play(){
  const ref = useRef(null)
  useEffect(()=>{
    const config = {
      type: Phaser.AUTO,
      parent: 'ph-wrap',
      width: Math.min(window.innerWidth, 900),
      height: Math.min(window.innerHeight, 1600),
      backgroundColor: '#0b1220',
      physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: [KitScene]
    }
    const game = new Phaser.Game(config)
    return ()=> game.destroy(true)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-3">
        <div id="ph-wrap" className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900"></div>
      </div>
    </div>
  )
}
