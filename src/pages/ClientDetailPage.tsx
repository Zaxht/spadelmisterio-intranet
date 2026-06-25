import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Client } from '../types'
import { getStoredClients } from '../utils/clientStorage'

export function ClientDetailPage() {
  const { clientId } = useParams<{ clientId: string }>()
  const [clients, setClients] = useState<Client[]>(() => getStoredClients())

  useEffect(() => {
    setClients(getStoredClients())
  }, [])

  const client = clients.find((currentClient) => currentClient.id === clientId)

  if (!client) {
    return (
      <section className="page-section">
        <div className="panel-card empty-state">
          <p className="eyebrow">Cliente no encontrado</p>
          <h2>No tenemos una ficha para este enlace.</h2>
          <Link className="text-link" to="/">
            Volver al dashboard
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Ficha dinamica</p>
        <h2>{client.petName}</h2>
        <p>
          Esta pagina usa el parametro <code>{clientId}</code> desde la URL.
        </p>
      </div>

      <article className="panel-card detail-card">
        <div>
          <span>Responsable</span>
          <strong>{client.name}</strong>
        </div>
        <div>
          <span>Tipo de mascota</span>
          <strong>{client.petType}</strong>
        </div>
        <div>
          <span>Telefono</span>
          <strong>{client.phone}</strong>
        </div>
        <div>
          <span>Correo</span>
          <strong>{client.email}</strong>
        </div>
      </article>
    </section>
  )
}
