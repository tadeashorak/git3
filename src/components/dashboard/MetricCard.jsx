import React from 'react'
import '../LoginForm.css'

function Sparkline({ data = [], width = 80, height = 24, stroke = 'rgba(255,255,255,0.75)' }) {
  if (!data || data.length === 0) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  })
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={points.join(' ')} />
    </svg>
  )
}

export default function MetricCard({ metric }) {
  const delta = Number(metric.delta)
  const deltaSign = delta >= 0 ? '+' : ''
  const deltaClass = delta >= 0 ? 'positive' : 'negative'
  const sparkStroke = delta >= 0 ? '#34d399' : '#f87171'
  return (
    <div className="metric-card" role="group" aria-label={metric.name} tabIndex={0}>
      <div className="metric-header">
        <div className="metric-name">{metric.name}</div>
        <div className={`metric-delta ${deltaClass}`} aria-hidden>{deltaSign}{metric.delta}%</div>
      </div>

      <div className="metric-value" aria-live="polite">{metric.value}</div>

      <div className="metric-spark" aria-hidden>
        <Sparkline data={metric.series} stroke={sparkStroke} />
      </div>
    </div>
  )
}
