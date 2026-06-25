import { SAMPLE_SERVICES } from '../data/mockData'
import type { Service } from '../types'
import { readStoredItem, saveStoredItem } from './storage'

const SERVICES_KEY = 'services'

export function getStoredServices() {
  const services = readStoredItem<Service[]>(SERVICES_KEY)

  if (services) {
    return services
  }

  saveStoredItem(SERVICES_KEY, SAMPLE_SERVICES)
  return SAMPLE_SERVICES
}

export function saveStoredServices(services: Service[]) {
  saveStoredItem(SERVICES_KEY, services)
}
