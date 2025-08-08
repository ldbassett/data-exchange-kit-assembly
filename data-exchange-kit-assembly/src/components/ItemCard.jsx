import React from 'react'

export default function ItemCard({ item, picked=false, onToggle }) {
  return (
    <button onClick={() => onToggle(item)}
      className={`text-left rounded-xl border p-3 transition w-full 
      ${picked ? 'border-accent bg-yellow-400/10' : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900/70'}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">{item.name}</div>
          <div className="text-xs text-slate-400">{item.tags.join(' • ')}</div>
        </div>
        <div className={`w-2.5 h-2.5 rounded-full ${picked?'bg-accent':'bg-primary/60'}`} />
      </div>
    </button>
  )
}
