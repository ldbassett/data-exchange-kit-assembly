import React from 'react'
import { Link } from 'react-router-dom'
export default function App(){
  return (
    <div className="min-h-screen bg-slate-950 text-white bg-grid">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold"><span className="text-primary">Data Exchange</span>: <span className="text-accent">Kit Assembly</span></h1>
        <p className="text-slate-300 mt-3 max-w-3xl">
          Step right up, Fort Wayne! Gather your finest pieces of kit, craft the ultimate combo, and deliver the goods!
          Score big, unlock hometown achievements, and prove you’ve got the tools for the job!
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          <Link to="/play" className="rounded-xl p-5 border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 transition">▶ Play</Link>
          <Link to="/board" className="rounded-xl p-5 border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 transition">🖥 Board</Link>
        </div>
      </div>
    </div>
  )
}
