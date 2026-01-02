function rand(max = 100, min = 0) {
  return Math.round(Math.random() * (max - min) + min)
}

function series(points = 12, base = 50, variance = 10) {
  const out = []
  let v = base
  for (let i = 0; i < points; i++) {
    v = Math.max(0, Math.round(v + (Math.random() - 0.5) * variance))
    out.push(v)
  }
  return out
}

export async function fetchStats(period = '24h') {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 200))
  // adjust sample density by period
  const points = period === '24h' ? 12 : period === '7d' ? 14 : 30
  const metrics = [
    { id: 'dau', name: 'Daily Active Users', value: rand(2400, 1200), delta: rand(8, -8), series: series(points, 1500, 300), prominent: true },
    { id: 'signups', name: 'New Signups', value: rand(120, 20), delta: rand(10, -10), series: series(points, 60, 40), prominent: true },
    { id: 'conversion', name: 'Conversion Rate (%)', value: (Math.random() * 5 + 1).toFixed(2), delta: (Math.random() * 2 - 1).toFixed(2), series: series(points, 2.5, 1), prominent: true },
    { id: 'revenue', name: 'Revenue', value: `$${rand(8000, 2000)}`, delta: rand(12, -12), series: series(points, 5000, 2500), prominent: true },
    { id: 'session', name: 'Avg Session (min)', value: (Math.random() * 10 + 2).toFixed(1), delta: (Math.random() * 2 - 1).toFixed(1), series: series(points, 6, 3) },
    { id: 'bounce', name: 'Bounce Rate (%)', value: (Math.random() * 40 + 10).toFixed(1), delta: (Math.random() * 5 - 2.5).toFixed(1), series: series(points, 30, 10) },
    { id: 'approvals', name: 'Pending Approvals', value: rand(12, 0), delta: rand(20, -20), series: series(points, 6, 8) },
    { id: 'tickets', name: 'Open Tickets', value: rand(24, 0), delta: rand(15, -15), series: series(points, 12, 10) },
    { id: 'tasks', name: 'Tasks Completed', value: rand(56, 10), delta: rand(20, -10), series: series(points, 30, 20) },
    { id: 'health', name: 'System Health (%)', value: `${rand(99, 95)}%`, delta: rand(1, -1), series: series(points, 99, 1) },
  ]

  return { metrics }
}
