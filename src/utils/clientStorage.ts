import { SAMPLE_CLIENTS } from '../data/mockData'
import type { Client } from '../types'
import { readStoredItem, saveStoredItem } from './storage'

const CLIENTS_KEY = 'clients'

export function getStoredClients() {
  const clients = readStoredItem<Client[]>(CLIENTS_KEY)

  if (clients) {
    return clients
  }

  saveStoredItem(CLIENTS_KEY, SAMPLE_CLIENTS)
  return SAMPLE_CLIENTS
}

export function saveStoredClients(clients: Client[]) {
  saveStoredItem(CLIENTS_KEY, clients)
}
