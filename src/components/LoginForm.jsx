import { useState } from 'react'
import './LoginForm.css'
import Dashboard from './Dashboard'

export default function LoginForm() {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  function validate() {
    if (isRegister) {
      if (!name || name.trim().length < 2) return 'Please enter your full name.'
      if (!dob) return 'Please enter your date of birth.'
      const bd = new Date(dob)
      if (Number.isNaN(bd.getTime())) return 'Please enter a valid date of birth.'
      // simple age check (>= 13)
      const today = new Date()
      let age = today.getFullYear() - bd.getFullYear()
      const m = today.getMonth() - bd.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--
      if (age < 13) return 'You must be at least 13 years old to register.'
    }

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return 'Please enter a valid email address.'
    }
    if (!password || password.length < 8) {
      return 'Password must be at least 8 characters.'
    }
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const clientErr = validate()
    if (clientErr) {
      setError(clientErr)
      return
    }

    setLoading(true)
    try {
        // Quick local admin shortcut for development (bypass network if using demo creds)
        if (!isRegister && email === 'admin@example.com' && password === 'adminpass') {
          setUser({ role: 'admin', email, name: 'Administrator' })
          setLoading(false)
          return
        }
      // Send credentials to server. Use HTTPS and server-side auth (cookie or token).
      const endpoint = isRegister ? '/api/register' : '/api/login'
      const payload = isRegister ? { name: name.trim(), dob, email, password } : { email, password }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // allow cookies from server
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || (isRegister ? 'Registration failed' : 'Login failed'))
      }

      // Try to read a user object from the server
      const body = await res.json().catch(() => null)
      if (isRegister) {
        alert('Registration successful — please sign in')
        setName('')
        setDob('')
        setPassword('')
        setIsRegister(false)
      } else {
        // login: set authenticated user. Prefer server-provided user data, fallback to mock admin check
        if (body && body.user) {
          setUser(body.user)
        } else if (email === 'admin@example.com' && password === 'adminpass') {
          setUser({ role: 'admin', email, name: 'Administrator' })
        } else {
          setUser({ role: 'user', email })
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return <Dashboard user={user} onLogout={() => { setUser(null); setEmail(''); setPassword('') }} />
  }

  return (
    <div className="auth-card">
      <h2 className="login-title">{isRegister ? 'Create account' : 'Sign in'}</h2>
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <>
            <label className="label">
              <span className="label-text">Full name</span>
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Your full name"
              />
            </label>

            <label className="label">
              <span className="label-text">Date of birth</span>
              <input
                className="input"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
              />
            </label>
          </>
        )}

        <label className="label">
          <span className="label-text">Email</span>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>

        <label className="label">
          <span className="label-text">Password</span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            placeholder="••••••••"
          />
        </label>

        {error && <div className="error" role="alert">{error}</div>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? (isRegister ? 'Creating account...' : 'Signing in...') : (isRegister ? 'Create account' : 'Sign in')}
        </button>
      </form>

      <div className="switch-row">
        <button
          type="button"
          className="switch-btn"
          onClick={() => {
            setError(null)
            setIsRegister((s) => !s)
          }}
        >
          {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  )
}
