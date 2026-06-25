import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DASHBOARD_STATS } from '../data/mockData'
import type { Appointment, Client, Service } from '../types'
import { getStoredAppointments } from '../utils/appointmentStorage'
import { getStoredClients } from '../utils/clientStorage'
import { getStoredServices } from '../utils/serviceStorage'

export function DashboardPage() {
  const [clients, setClients] = useState<Client[]>(() => getStoredClients())
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStoredAppointments())
  const [services, setServices] = useState<Service[]>(() => getStoredServices())

  useEffect(() => {
    setClients(getStoredClients())
    setAppointments(getStoredAppointments())
    setServices(getStoredServices())
  }, [])

  const dynamicStats = DASHBOARD_STATS.map((stat) => {
    if (stat.label === 'Citas de hoy') {
      return {
        ...stat,
        value: String(appointments.length),
        detail: 'Citas guardadas en agenda',
      }
    }

    if (stat.label === 'Clientes activos') {
      return {
        ...stat,
        value: String(clients.length),
      }
    }

    if (stat.label === 'Servicios agendados') {
      return {
        ...stat,
        value: String(services.filter((service) => service.active).length),
        detail: 'Servicios activos en catalogo',
      }
    }

    return stat
  })

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Panel principal</p>
        <h2>Resumen del dia</h2>
        <p>
          Aqui veremos rapidamente la actividad interna del servicio a domicilio.
        </p>
      </div>

      <div className="stats-grid">
        {dynamicStats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.detail}</p>
          </article>
        ))}
      </div>

      <section className="panel-card" aria-labelledby="clients-title">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Clientes recientes</p>
            <h3 id="clients-title">Mascotas en seguimiento</h3>
          </div>
          <span className="pill">Datos locales</span>
        </div>

        <div className="client-list">
          {clients.slice(0, 4).map((client) => (
            <Link className="client-row" key={client.id} to={`/clientes/${client.id}`}>
              <span>
                <strong>{client.petName}</strong>
                {client.petType} de {client.name}
              </span>
              <small>Ver ficha</small>
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}
