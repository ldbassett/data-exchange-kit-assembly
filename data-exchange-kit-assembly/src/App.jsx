import React from 'react'
import { Link } from 'react-router-dom'
import { THEME } from './game/kitData'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white bg-grid relative">
      <div className="absolute inset-0 pointer-events-none"
           style={{background: 'radial-gradient(600px 300px at 20% 10%, rgba(31,110,235,0.15), transparent), radial-gradient(500px 200px at 80% 30%, rgba(255,210,0,0.12), transparent)'}} />
      <header className="relative z-10 px-6 py-8 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <span className="text-primary">Data Exchange</span>: <span className="text-accent">Kit Assembly</span>
        </h1>
        <p className="mt-3 text-slate-300 max-w-3xl">
          Step right up, Fort Wayne! Gather your finest pieces of kit, craft the ultimate combo, and deliver the goods!
          Score big, unlock hometown achievements, and prove you’ve got the tools for the job!
        </p>
      </header>

      <main className="relative z-10 px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link to="/play" className="group rounded-2xl border border-slate-800 p-6 bg-slate-900/40 hover:bg-slate-900/60 transition shadow-glow">
            <h2 className="text-xl font-semibold">▶ Play on Phone</h2>
            <p className="text-slate-300 mt-2">Collect 3–5 pieces of kit, trigger tasks, earn stickers and points.</p>
            <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20" />
          </Link>
          <Link to="/board" className="group rounded-2xl border border-slate-800 p-6 bg-slate-900/40 hover:bg-slate-900/60 transition">
            <h2 className="text-xl font-semibold">🖥 Board View</h2>
            <p className="text-slate-300 mt-2">Animated cellular grid highlighting trending kits and achievements.</p>
            <div className="mt-4 h-24 rounded-xl bg-gradient-to-tr from-accent/20 to-primary/20" />
          </Link>
        </div>
        <div className="mt-10 text-sm text-slate-400">
          Theme colors: <span className="text-primary">{THEME.primary}</span> / <span className="text-accent">{THEME.accent}</span>
        </div>
      </main>
    </div>
  )
}
