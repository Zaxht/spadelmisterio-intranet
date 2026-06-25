import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Appointment, AppointmentFormData, Client, Service } from '../types'
import { getStoredAppointments, saveStoredAppointments } from '../utils/appointmentStorage'
import { getStoredClients } from '../utils/clientStorage'
import { getStoredServices } from '../utils/serviceStorage'

const EMPTY_APPOINTMENT_FORM: AppointmentFormData = {
  clientId: '',
  serviceName: '',
  date: '',
  time: '',
  status: 'pendiente',
  notes: '',
}

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStoredAppointments())
  const [clients, setClients] = useState<Client[]>(() => getStoredClients())
  const [services, setServices] = useState<Service[]>(() => getStoredServices())
  const [formData, setFormData] = useState<AppointmentFormData>(EMPTY_APPOINTMENT_FORM)
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null)
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    // Recargamos datos al entrar para tener clientes, servicios y citas actualizados.
    setAppointments(getStoredAppointments())
    setClients(getStoredClients())
    setServices(getStoredServices())
  }, [])

  const activeServices = services.filter((service) => service.active)

  const filteredAppointments = appointments.filter((appointment) => {
    const client = findClientById(appointment.clientId)
    const searchValue = searchText.trim().toLowerCase()

    if (!searchValue) {
      return true
    }

    return (
      appointment.serviceName.toLowerCase().includes(searchValue) ||
      appointment.status.toLowerCase().includes(searchValue) ||
      client?.name.toLowerCase().includes(searchValue) ||
      client?.petName.toLowerCase().includes(searchValue)
    )
  })

  // Busca el cliente relacionado con una cita para mostrar mascota y responsable.
  function findClientById(clientId: string) {
    return clients.find((client) => client.id === clientId)
  }

  // Cambia un campo del formulario manteniendo intactos los demas.
  function updateFormField(fieldName: keyof AppointmentFormData, value: string) {
    setFormData({
      ...formData,
      [fieldName]: value,
    })
  }

  // Guarda una cita nueva o reemplaza la cita que se esta editando.
  function saveAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    if (!formData.clientId || !formData.serviceName || !formData.date || !formData.time) {
      setFormError('Selecciona cliente, servicio, fecha y hora.')
      return
    }

    const nextAppointments = editingAppointmentId
      ? appointments.map((appointment) =>
          appointment.id === editingAppointmentId
            ? { ...formData, id: editingAppointmentId }
            : appointment,
        )
      : [...appointments, { ...formData, id: `cita-${Date.now()}` }]

    setAppointments(nextAppointments)
    saveStoredAppointments(nextAppointments)
    resetForm()
  }

  // Pasa una cita existente al formulario para poder modificarla.
  function startEditingAppointment(appointment: Appointment) {
    setEditingAppointmentId(appointment.id)
    setFormData({
      clientId: appointment.clientId,
      serviceName: appointment.serviceName,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes,
    })
    setFormError('')
  }

  // Activa el mensaje de confirmacion antes de borrar.
  function askToDeleteAppointment(appointmentId: string) {
    setAppointmentIdToDelete(appointmentId)
  }

  // Borra la cita confirmada y guarda el nuevo arreglo en localStorage.
  function confirmDeleteAppointment() {
    if (!appointmentIdToDelete) {
      return
    }

    const nextAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentIdToDelete,
    )
    setAppointments(nextAppointments)
    saveStoredAppointments(nextAppointments)
    setAppointmentIdToDelete(null)
  }

  // Vuelve el formulario a su estado inicial.
  function resetForm() {
    setFormData(EMPTY_APPOINTMENT_FORM)
    setEditingAppointmentId(null)
    setFormError('')
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Modulo CRUD</p>
        <h2>Agenda de citas</h2>
        <p>
          Organiza visitas a domicilio y conserva los datos aunque recargues.
        </p>
      </div>

      <div className="crud-layout">
        <section className="panel-card" aria-labelledby="appointment-form-title">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Formulario</p>
              <h3 id="appointment-form-title">
                {editingAppointmentId ? 'Editar cita' : 'Nueva cita'}
              </h3>
            </div>
          </div>

          <form className="data-form" onSubmit={saveAppointment}>
            <label htmlFor="clientId">Cliente y mascota</label>
            <select
              id="clientId"
              value={formData.clientId}
              onChange={(event) => updateFormField('clientId', event.target.value)}
            >
              <option value="">Selecciona un cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.petName} - {client.name}
                </option>
              ))}
            </select>

            <label htmlFor="serviceName">Servicio</label>
            <select
              id="serviceName"
              value={formData.serviceName}
              onChange={(event) => updateFormField('serviceName', event.target.value)}
            >
              <option value="">Selecciona un servicio</option>
              {activeServices.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>

            <label htmlFor="date">Fecha</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(event) => updateFormField('date', event.target.value)}
            />

            <label htmlFor="time">Hora</label>
            <input
              id="time"
              type="time"
              value={formData.time}
              onChange={(event) => updateFormField('time', event.target.value)}
            />

            <label htmlFor="status">Estado</label>
            <select
              id="status"
              value={formData.status}
              onChange={(event) => updateFormField('status', event.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="realizada">Realizada</option>
            </select>

            <label htmlFor="notes">Notas</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(event) => updateFormField('notes', event.target.value)}
              placeholder="Indicaciones para la visita..."
            />

            {formError && <p className="form-error">{formError}</p>}

            <div className="form-actions">
              <button type="submit">
                {editingAppointmentId ? 'Guardar cambios' : 'Agendar cita'}
              </button>
              {editingAppointmentId && (
                <button className="secondary-button" type="button" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel-card" aria-labelledby="appointment-list-title">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Listado</p>
              <h3 id="appointment-list-title">{appointments.length} citas guardadas</h3>
            </div>
          </div>

          <label className="search-box" htmlFor="appointmentSearch">
            Buscar por mascota, servicio o estado
            <input
              id="appointmentSearch"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Ej: Luna, paseo, pendiente..."
            />
          </label>

          <div className="client-list">
            {filteredAppointments.map((appointment) => {
              const client = findClientById(appointment.clientId)

              return (
                <article className="client-row client-row-with-actions" key={appointment.id}>
                  <span>
                    <strong>{appointment.serviceName}</strong>
                    {client?.petName ?? 'Mascota sin ficha'} - {appointment.date} a las{' '}
                    {appointment.time}
                  </span>
                  <div className="row-actions">
                    <span className="status-pill">{appointment.status}</span>
                    <Link to={`/citas/${appointment.id}`}>Ver</Link>
                    <button type="button" onClick={() => startEditingAppointment(appointment)}>
                      Editar
                    </button>
                    <button type="button" onClick={() => askToDeleteAppointment(appointment.id)}>
                      Eliminar
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          {filteredAppointments.length === 0 && (
            <p className="empty-list">No hay citas con ese filtro.</p>
          )}
        </section>
      </div>

      {appointmentIdToDelete && (
        <div className="delete-confirmation" role="alert">
          <span>Quieres eliminar esta cita?</span>
          <button type="button" onClick={confirmDeleteAppointment}>
            Si, eliminar
          </button>
          <button type="button" onClick={() => setAppointmentIdToDelete(null)}>
            Cancelar
          </button>
        </div>
      )}
    </section>
  )
}
