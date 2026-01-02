import { useEffect, useState, useCallback } from 'react'
import { fetchStats } from '../../mocks/stats'

export default function useStats(period = '24h', pollInterval = 30000) {
  const [metrics, setMetrics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchStats(period)
      setMetrics(res.metrics || [])
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const id = setInterval(load, pollInterval)
    return () => clearInterval(id)
  }, [load, pollInterval, period])

  return { metrics, loading, error, refresh: load }
}
