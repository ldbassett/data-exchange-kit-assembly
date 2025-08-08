import React, { useMemo, useState, useEffect } from 'react'
import Header from '../components/Header'
import Grid from '../components/Grid'
import ItemCard from '../components/ItemCard'
import Sticker from '../components/Sticker'
import HUD from '../components/HUD'
import { ITEMS } from '../game/kitData'
import { scoreBuild } from '../game/combos'

const LIMIT = 5

export default function Play() {
  const [picked, setPicked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('picked')||'[]') } catch { return [] }
  })
  const [energy, setEnergy] = useState({})

  useEffect(() => { localStorage.setItem('picked', JSON.stringify(picked)) }, [picked])

  function toggle(item) {
    setPicked(prev => {
      const exists = prev.find(p => p.id === item.id)
      if (exists) return prev.filter(p => p.id !== item.id)
      if (prev.length >= LIMIT) return prev // limit
      return [...prev, item]
    })
  }

  const { total, achievements } = useMemo(() => scoreBuild(picked), [picked])

  // Bias energy toward number of picked items to create hotspots
  useEffect(() => {
    const e = {}
    for (let i=0;i<picked.length;i++) {
      const x = 3 + i*3, y = 2 + i*2
      e[`${x},${y}`] = 3 + i // simple pattern for visual flair
    }
    setEnergy(e)
  }, [picked])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <Header />
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <Grid cols={42} rows={24} cellSize={14} energyMap={energy} />
            <HUD score={total} count={picked.length} limit={LIMIT} />
            <div className="text-xs text-slate-400">Pick up to {LIMIT} items. Earn more by finding smart combos.</div>
            <div className="mt-4">
              {achievements.length>0 && (
                <div>
                  <div className="text-slate-200 mb-2 font-medium">Achievements Unlocked</div>
                  <div>{achievements.map((a,idx)=>(<Sticker key={idx} text={`${a.name} (+${a.points})`} bonus={!!a.bonus} />))}</div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
            <div className="sticky top-0 z-10 py-2 bg-slate-950/90 backdrop-blur-lg">
              <div className="text-slate-300 text-sm">Tap to add/remove. Your goal: create logical 3–5 item builds.</div>
            </div>
            {ITEMS.map(item => (
              <ItemCard key={item.id} item={item} picked={!!picked.find(p=>p.id===item.id)} onToggle={toggle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
