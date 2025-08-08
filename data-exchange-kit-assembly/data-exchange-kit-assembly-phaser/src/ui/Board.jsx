import React from 'react'
export default function Board(){
  return (
    <div className="min-h-screen bg-slate-950 text-white bg-grid flex items-center justify-center">
      <div className="text-center p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
        <div className="text-xl font-semibold mb-2">Spectator Board</div>
        <div className="text-slate-300">This view will evolve; for now, play on your device in the Play tab.</div>
      </div>
    </div>
  )
}
