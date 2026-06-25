import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Appointment, Client } from '../types'
import { getStoredAppointments } from '../utils/appointmentStorage'
import { getStoredClients } from '../utils/clientStorage'

export function AppointmentDetailPage() {
  const { appointmentId } = useParams<{ appointmentId: string }>()
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStoredAppointments())
  const [clients, setClients] = useState<Client[]>(() => getStoredClients())

  useEffect(() => {
    setAppointments(getStoredAppointments())
    setClients(getStoredClients())
  }, [])

  const appointment = appointments.find((currentAppointment) => {
    return currentAppointment.id === appointmentId
  })
  const client = clients.find((currentClient) => {
    return currentClient.id === appointment?.clientId
  })

  if (!appointment) {
    return (
      <section className="page-section">
        <div className="panel-card empty-state">
          <p className="eyebrow">Cita no encontrada</p>
          <h2>No tenemos una cita para este enlace.</h2>
          <Link className="text-link" to="/citas">
            Volver a agenda
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Detalle dinamico</p>
        <h2>{appointment.serviceName}</h2>
        <p>
          Esta pagina usa el parametro <code>{appointmentId}</code> desde la URL.
        </p>
      </div>

      <article className="panel-card detail-card">
        <div>
          <span>Mascota</span>
          <strong>{client?.petName ?? 'Sin ficha'}</strong>
        </div>
        <div>
          <span>Responsable</span>
          <strong>{client?.name ?? 'Cliente no encontrado'}</strong>
        </div>
        <div>
          <span>Fecha y hora</span>
          <strong>
            {appointment.date} - {appointment.time}
          </strong>
        </div>
        <div>
          <span>Estado</span>
          <strong>{appointment.status}</strong>
        </div>
        <div className="detail-card-wide">
          <span>Notas</span>
          <strong>{appointment.notes || 'Sin notas especiales'}</strong>
        </div>
      </article>
    </section>
  )
}
