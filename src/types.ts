export interface UserSession {
  id: string
  name: string
  email: string
  role: 'administrador' | 'recepcion'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface Client {
  id: string
  name: string
  petName: string
  petType: string
  phone: string
  email: string
}

export type ClientFormData = Omit<Client, 'id'>

export interface DashboardStat {
  label: string
  value: string
  detail: string
}
