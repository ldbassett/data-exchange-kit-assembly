import React, { useRef, useEffect } from 'react'
import { step } from '../game/automaton'

export default function Grid({ cols=48, rows=24, cellSize=14, speed=240, energyMap={} }) {
  const canvasRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = cols * cellSize
    canvas.height = rows * cellSize

    // init grid
    gridRef.current = Array.from({length: rows}, () => Array.from({length: cols}, () => Math.random() < 0.18 ? 1 : 0))

    let raf
    let last = 0
    function draw(ts) {
      if (ts - last > speed) {
        gridRef.current = step(gridRef.current, energyMap)
        last = ts
      }
      // draw
      ctx.fillStyle = 'rgba(2,6,23,1)' // bg-slate-950
      ctx.fillRect(0,0,canvas.width,canvas.height)
      for (let y=0;y<rows;y++) for (let x=0;x<cols;x++) {
        const alive = gridRef.current[y][x] === 1
        const e = energyMap[`${x},${y}`] || 0
        if (alive || e>0) {
          const px = x*cellSize, py = y*cellSize
          const base = alive ? 0.6 : 0.2
          const alpha = Math.min(1, base + e*0.15)
          ctx.fillStyle = `rgba(31,110,235,${alpha})`
          ctx.fillRect(px+1, py+1, cellSize-2, cellSize-2)
          if (e>0) {
            ctx.fillStyle = `rgba(255,210,0,${Math.min(0.85, 0.25 + e*0.12)})`
            ctx.fillRect(px+3, py+3, cellSize-6, cellSize-6)
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [cols, rows, cellSize, speed, energyMap])

  return <canvas ref={canvasRef} className="rounded-xl border border-slate-800 shadow-inner" />
}
