import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { DEMO_CREDENTIALS } from '../data/mockData'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email)
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password)
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // Evita recargar la pagina, valida credenciales y navega al dashboard.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const loginWasSuccessful = login({ email, password })

    if (!loginWasSuccessful) {
      setError('Correo o contrasena incorrectos.')
      return
    }

    navigate('/', { replace: true })
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <p className="eyebrow">Acceso interno</p>
        <h1 id="login-title">Intranet Spa del Misterio</h1>
        <p className="login-intro">
          Gestiona clientes, mascotas y citas desde un panel privado.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Contrasena</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Entrar a la intranet</button>
        </form>

        <p className="helper-text">
          Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </section>
    </main>
  )
}
