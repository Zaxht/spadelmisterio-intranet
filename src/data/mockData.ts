import type {
  Appointment,
  Client,
  DashboardStat,
  LoginCredentials,
  Service,
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

export const SAMPLE_SERVICES: Service[] = [
  {
    id: 'servicio-bano',
    name: 'Bano y limpieza',
    description: 'Limpieza completa a domicilio para mascotas pequenas y medianas.',
    price: 18000,
    durationMinutes: 60,
    active: true,
  },
  {
    id: 'servicio-peluqueria',
    name: 'Peluqueria completa',
    description: 'Corte, peinado y terminaciones segun tipo de pelaje.',
    price: 28000,
    durationMinutes: 90,
    active: true,
  },
  {
    id: 'servicio-paseo',
    name: 'Paseo de mascotas',
    description: 'Paseos seguros para liberar energia y mantener rutina.',
    price: 12000,
    durationMinutes: 45,
    active: true,
  },
  {
    id: 'servicio-babysitting',
    name: 'Babysitting',
    description: 'Acompanamiento temporal cuando la familia no esta en casa.',
    price: 22000,
    durationMinutes: 120,
    active: true,
  },
  {
    id: 'servicio-unas',
    name: 'Corte de unas',
    description: 'Cuidado rapido para evitar molestias al caminar.',
    price: 9000,
    durationMinutes: 25,
    active: true,
  },
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
