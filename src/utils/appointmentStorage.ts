import { SAMPLE_APPOINTMENTS } from '../data/mockData'
import type { Appointment } from '../types'
import { readStoredItem, saveStoredItem } from './storage'

const APPOINTMENTS_KEY = 'appointments'

// Entrega las citas guardadas o crea citas demo si es la primera carga.
export function getStoredAppointments() {
  const appointments = readStoredItem<Appointment[]>(APPOINTMENTS_KEY)

  if (appointments) {
    return appointments
  }

  saveStoredItem(APPOINTMENTS_KEY, SAMPLE_APPOINTMENTS)
  return SAMPLE_APPOINTMENTS
}

// Guarda el arreglo completo despues de crear, editar o eliminar.
export function saveStoredAppointments(appointments: Appointment[]) {
  saveStoredItem(APPOINTMENTS_KEY, appointments)
}
