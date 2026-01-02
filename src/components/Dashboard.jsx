import React, { useState } from 'react'
import './LoginForm.css'
import StatsGrid from './dashboard/StatsGrid'
import useStats from './dashboard/useStats'

export default function Dashboard({ user, onLogout }) {
  const isAdmin = user?.role === 'admin'
  const [period, setPeriod] = useState('24h')
  const { metrics, loading, error, refresh } = useStats(period)

  return (
    <div className="dashboard-box">
      <div className="dashboard-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="login-title">{isAdmin ? 'Admin dashboard' : 'Dashboard'}</h2>
        <div>
          <button className="btn" onClick={refresh} style={{ marginRight: 8 }}>Refresh</button>
          <button className="btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="dashboard-card"><strong>User</strong><div>{user?.name || user?.email}</div></div>
          <div className="dashboard-card"><strong>Role</strong><div>{user?.role}</div></div>
          <div className="toolbar">
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`period-btn ${period === '24h' ? 'active' : ''}`} onClick={() => setPeriod('24h')}>24h</button>
              <button className={`period-btn ${period === '7d' ? 'active' : ''}`} onClick={() => setPeriod('7d')}>7d</button>
              <button className={`period-btn ${period === '30d' ? 'active' : ''}`} onClick={() => setPeriod('30d')}>30d</button>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {loading && (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="metric-card">
                <div className="skeleton h"></div>
                <div className="skeleton v" style={{ marginTop: 8 }}></div>
              </div>
            ))
          )}

          {error && <div className="error">{error}</div>}

          {!loading && !error && <StatsGrid metrics={metrics} />}
        </div>
      </div>
      </div>
    </div>
  )
}
