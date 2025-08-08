import React from 'react'

export default function Sticker({ text, bonus=false }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm mr-2 mb-2
      ${bonus ? 'border-accent text-accent' : 'border-primary text-primary'}`}>
      <span>🏅</span>
      <span className="font-medium">{text}</span>
    </div>
  )
}
