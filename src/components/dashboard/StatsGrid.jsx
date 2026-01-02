import React from 'react'
import MetricCard from './MetricCard'
import './dashboard.css'

export default function StatsGrid({ metrics = [] }) {
  return (
    <div className="stats-grid">
      {metrics.map((m) => (
        <div key={m.id} className={`metric-item ${m.prominent ? 'prominent' : ''}`}>
          <MetricCard metric={m} />
        </div>
      ))}
    </div>
  )
}
