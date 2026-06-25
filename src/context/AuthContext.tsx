import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContextCore'
import type { AuthContextValue } from './AuthContextCore'
import { DEMO_CREDENTIALS, DEMO_USER } from '../data/mockData'
import type { LoginCredentials, UserSession } from '../types'
import { readStoredItem, removeStoredItem, saveStoredItem } from '../utils/storage'

const SESSION_KEY = 'session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null)

  useEffect(() => {
    setSession(readStoredItem<UserSession>(SESSION_KEY))
  }, [])

  function login(credentials: LoginCredentials) {
    const validEmail = credentials.email.trim().toLowerCase() === DEMO_CREDENTIALS.email
    const validPassword = credentials.password === DEMO_CREDENTIALS.password

    if (!validEmail || !validPassword) {
      return false
    }

    setSession(DEMO_USER)
    saveStoredItem(SESSION_KEY, DEMO_USER)
    return true
  }

  function logout() {
    setSession(null)
    removeStoredItem(SESSION_KEY)
  }

  const value: AuthContextValue = {
    session,
    isAuthenticated: session !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
