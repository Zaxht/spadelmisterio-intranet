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

export interface Appointment {
  id: string
  clientId: string
  serviceName: string
  date: string
  time: string
  status: 'pendiente' | 'confirmada' | 'realizada'
  notes: string
}

export type AppointmentFormData = Omit<Appointment, 'id'>

export interface Service {
  id: string
  name: string
  description: string
  price: number
  durationMinutes: number
  active: boolean
}

export type ServiceFormData = Omit<Service, 'id'>

export interface DashboardStat {
  label: string
  value: string
  detail: string
}
