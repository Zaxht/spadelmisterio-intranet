import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextCore'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    // Este error ayuda a detectar si olvidamos envolver la app con AuthProvider.
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}
