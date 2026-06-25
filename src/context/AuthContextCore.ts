import { createContext } from 'react'
import type { LoginCredentials, UserSession } from '../types'

export interface AuthContextValue {
  session: UserSession | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
