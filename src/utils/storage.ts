const APP_PREFIX = 'spadelmisterio-intranet'

// Lee datos desde localStorage y los convierte desde JSON a su tipo original.
export function readStoredItem<T>(key: string): T | null {
  const storedValue = window.localStorage.getItem(`${APP_PREFIX}:${key}`)

  if (!storedValue) {
    return null
  }

  try {
    return JSON.parse(storedValue) as T
  } catch {
    // Si el dato guardado esta roto, lo borramos para evitar errores en la app.
    window.localStorage.removeItem(`${APP_PREFIX}:${key}`)
    return null
  }
}

// Guarda cualquier dato como JSON usando una llave con prefijo del proyecto.
export function saveStoredItem<T>(key: string, value: T) {
  window.localStorage.setItem(`${APP_PREFIX}:${key}`, JSON.stringify(value))
}

// Borra una llave especifica, por ejemplo al cerrar sesion.
export function removeStoredItem(key: string) {
  window.localStorage.removeItem(`${APP_PREFIX}:${key}`)
}
