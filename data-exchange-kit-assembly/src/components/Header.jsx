import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <Link to="/" className="text-lg font-bold tracking-tight">
        <span className="text-primary">Data Exchange</span>: <span className="text-accent">Kit Assembly</span>
      </Link>
      <nav className="flex items-center gap-2 text-sm">
        <Link to="/play" className={`px-3 py-1.5 rounded-lg border ${pathname==='/play'?'border-accent text-accent':'border-slate-700 text-slate-300 hover:border-slate-500'}`}>Play</Link>
        <Link to="/board" className={`px-3 py-1.5 rounded-lg border ${pathname==='/board'?'border-primary text-primary':'border-slate-700 text-slate-300 hover:border-slate-500'}`}>Board</Link>
      </nav>
    </div>
  )
}
