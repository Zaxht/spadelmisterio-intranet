import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function AppLayout() {
  const { logout, session } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Intranet</p>
          <h1>Spa del Misterio</h1>
        </div>

        <nav className="main-nav" aria-label="Navegacion principal">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/clientes">Clientes</NavLink>
          <NavLink to="/citas">Agenda</NavLink>
        </nav>

        <div className="session-card">
          <span>Sesion activa</span>
          <strong>{session?.name}</strong>
          <button type="button" onClick={handleLogout}>
            Cerrar sesion
          </button>
        </div>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  )
}
