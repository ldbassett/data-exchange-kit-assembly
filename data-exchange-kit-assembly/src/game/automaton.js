
// Simple cellular automaton: life-like with bias for "energized" cells.
export function createGrid(cols, rows) {
  const grid = new Array(rows).fill(0).map(()=> new Array(cols).fill(0));
  return grid;
}

export function randomizeGrid(grid, density=0.2) {
  const r = grid.length, c = grid[0].length;
  for (let y=0;y<r;y++) for (let x=0;x<c;x++) {
    grid[y][x] = Math.random() < density ? 1 : 0;
  }
}

function neighbors(grid, x, y) {
  const r = grid.length, c = grid[0].length;
  let n = 0;
  for (let dy=-1; dy<=1; dy++) for (let dx=-1; dx<=1; dx++) {
    if (dx===0 && dy===0) continue;
    const yy = (y+dy+r)%r, xx = (x+dx+c)%c;
    n += grid[yy][xx] ? 1 : 0;
  }
  return n;
}

export function step(grid, energyMap) {
  const r = grid.length, c = grid[0].length;
  const next = createGrid(c, r);
  for (let y=0;y<r;y++) for (let x=0;x<c;x++) {
    const n = neighbors(grid,x,y);
    const alive = grid[y][x]===1;
    const energy = (energyMap?.[`${x},${y}`] ?? 0);
    // Bias rules: more likely to survive/birth with energy
    const survive = (n===2 || n===3) || (energy>0 && n>=2 && n<=4);
    const birth = (n===3) || (energy>1 && n===2);
    next[y][x] = alive ? (survive?1:0) : (birth?1:0);
  }
  return next;
}
