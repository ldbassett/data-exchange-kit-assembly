import React from 'react'

export default function HUD({ score, count, limit }) {
  return (
    <div className="flex items-center gap-4 text-sm text-slate-300">
      <div className="px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-800">Score: <span className="text-accent font-semibold">{score}</span></div>
      <div className="px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-800">Kit: <span className="text-primary font-semibold">{count}/{limit}</span></div>
    </div>
  )
}
