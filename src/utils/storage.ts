const APP_PREFIX = 'spadelmisterio-intranet'

export function readStoredItem<T>(key: string): T | null {
  const storedValue = window.localStorage.getItem(`${APP_PREFIX}:${key}`)

  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue) as T
  } catch {
    window.localStorage.removeItem(`${APP_PREFIX}:${key}`)
    return null
  }
}

export function saveStoredItem<T>(key: string, value: T) {
  window.localStorage.setItem(`${APP_PREFIX}:${key}`, JSON.stringify(value))
}

export function removeStoredItem(key: string) {
  window.localStorage.removeItem(`${APP_PREFIX}:${key}`)
}
