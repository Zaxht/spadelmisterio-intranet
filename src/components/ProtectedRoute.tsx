import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Si no hay sesion, no dejamos ver la intranet y volvemos al login.
    return <Navigate to="/login" replace />
  }

  return children
}
