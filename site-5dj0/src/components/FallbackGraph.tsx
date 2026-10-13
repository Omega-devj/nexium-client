import { graphEdges, graphNodes, signalText } from '@/content/signal'

/**
 * La figure du chapitre Signal en SVG, pour les appareils sans WebGL :
 * mêmes nœuds, mêmes relations, données synthétiques.
 */
export function FallbackGraph({ className }: { className?: string }) {
  const pos = (id: string) => {
    const n = graphNodes.find((g) => g.id === id)!
    return { x: 50 + n.x * 44, y: 32 - n.y * 26 }
  }
  return (
    <svg viewBox="0 0 100 64" className={className} role="img" aria-label={signalText.synthetic}>
      {graphEdges.map(([a, b]) => {
        const p = pos(a)
        const q = pos(b)
        return <line key={a + b} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="currentColor" strokeWidth={0.18} strokeDasharray="0.6 0.6" opacity={0.7} />
      })}
      {graphNodes.map((n) => {
        const p = pos(n.id)
        return (
          <g key={n.id}>
            <circle cx={p.x} cy={p.y} r={n.core ? 1.8 : 1.2} fill={n.core ? 'var(--vermilion)' : 'currentColor'} />
            <text x={p.x + 2.4} y={p.y + 0.9} fontSize={2.2} fill={n.core ? 'var(--vermilion)' : 'currentColor'} style={{ fontFamily: 'var(--font-mono)' }}>
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
