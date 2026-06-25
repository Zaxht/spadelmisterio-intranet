import type {
  Appointment,
  Client,
  DashboardStat,
  LoginCredentials,
  UserSession,
} from '../types'

export const DEMO_CREDENTIALS: LoginCredentials = {
  email: 'admin@spadelmisterio.cl',
  password: 'spadelmisterio',
}

export const DEMO_USER: UserSession = {
  id: 'user-admin',
  name: 'Shaggy',
  email: DEMO_CREDENTIALS.email,
  role: 'administrador',
}

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    label: 'Citas de hoy',
    value: '6',
    detail: '2 pendientes por confirmar',
  },
  {
    label: 'Clientes activos',
    value: '24',
    detail: 'Incluye mascotas recurrentes',
  },
  {
    label: 'Servicios agendados',
    value: '13',
    detail: 'Bano, peluqueria y paseo',
  },
]

export const SAMPLE_CLIENTS: Client[] = [
  {
    id: 'cliente-luna',
    name: 'Camila Torres',
    petName: 'Luna',
    petType: 'Perrita',
    phone: '+56 9 4321 8765',
    email: 'camila@example.com',
  },
  {
    id: 'cliente-max',
    name: 'Diego Morales',
    petName: 'Max',
    petType: 'Gatito',
    phone: '+56 9 9876 1234',
    email: 'diego@example.com',
  },
]

export const SERVICE_OPTIONS = [
  'Bano y limpieza',
  'Peluqueria completa',
  'Paseo de mascotas',
  'Babysitting',
  'Corte de unas',
]

export const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 'cita-luna',
    clientId: 'cliente-luna',
    serviceName: 'Peluqueria completa',
    date: '2026-06-28',
    time: '10:30',
    status: 'confirmada',
    notes: 'Llevar shampoo hipoalergenico.',
  },
  {
    id: 'cita-max',
    clientId: 'cliente-max',
    serviceName: 'Babysitting',
    date: '2026-06-29',
    time: '16:00',
    status: 'pendiente',
    notes: 'Max se asusta con ruidos fuertes.',
  },
]
