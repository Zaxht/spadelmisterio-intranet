import { SAMPLE_APPOINTMENTS } from '../data/mockData'
import type { Appointment } from '../types'
import { readStoredItem, saveStoredItem } from './storage'

const APPOINTMENTS_KEY = 'appointments'

export function getStoredAppointments() {
  const appointments = readStoredItem<Appointment[]>(APPOINTMENTS_KEY)

  if (appointments) {
    return appointments
  }

  saveStoredItem(APPOINTMENTS_KEY, SAMPLE_APPOINTMENTS)
  return SAMPLE_APPOINTMENTS
}

export function saveStoredAppointments(appointments: Appointment[]) {
  saveStoredItem(APPOINTMENTS_KEY, appointments)
}
