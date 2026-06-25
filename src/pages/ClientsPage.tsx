import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Client, ClientFormData } from '../types'
import { getStoredClients, saveStoredClients } from '../utils/clientStorage'

const EMPTY_FORM: ClientFormData = {
  name: '',
  petName: '',
  petType: '',
  phone: '',
  email: '',
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [formData, setFormData] = useState<ClientFormData>(EMPTY_FORM)
  const [editingClientId, setEditingClientId] = useState<string | null>(null)
  const [clientIdToDelete, setClientIdToDelete] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    setClients(getStoredClients())
  }, [])

  const filteredClients = clients.filter((client) => {
    const searchValue = searchText.trim().toLowerCase()

    if (!searchValue) {
      return true
    }

    return (
      client.name.toLowerCase().includes(searchValue) ||
      client.petName.toLowerCase().includes(searchValue) ||
      client.petType.toLowerCase().includes(searchValue)
    )
  })

  function updateFormField(fieldName: keyof ClientFormData, value: string) {
    setFormData({
      ...formData,
      [fieldName]: value,
    })
  }

  function saveClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    if (!formData.name || !formData.petName || !formData.petType || !formData.phone) {
      setFormError('Completa responsable, mascota, tipo y telefono.')
      return
    }

    const nextClients = editingClientId
      ? clients.map((client) =>
          client.id === editingClientId ? { ...formData, id: editingClientId } : client,
        )
      : [...clients, { ...formData, id: `cliente-${Date.now()}` }]

    setClients(nextClients)
    saveStoredClients(nextClients)
    resetForm()
  }

  function startEditingClient(client: Client) {
    setEditingClientId(client.id)
    setFormData({
      name: client.name,
      petName: client.petName,
      petType: client.petType,
      phone: client.phone,
      email: client.email,
    })
    setFormError('')
  }

  function askToDeleteClient(clientId: string) {
    setClientIdToDelete(clientId)
  }

  function confirmDeleteClient() {
    if (!clientIdToDelete) {
      return
    }

    const nextClients = clients.filter((client) => client.id !== clientIdToDelete)
    setClients(nextClients)
    saveStoredClients(nextClients)
    setClientIdToDelete(null)
  }

  function resetForm() {
    setFormData(EMPTY_FORM)
    setEditingClientId(null)
    setFormError('')
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Modulo CRUD</p>
        <h2>Clientes y mascotas</h2>
        <p>
          Crea, busca, edita y elimina fichas guardadas en el navegador.
        </p>
      </div>

      <div className="crud-layout">
        <section className="panel-card" aria-labelledby="client-form-title">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Formulario</p>
              <h3 id="client-form-title">
                {editingClientId ? 'Editar cliente' : 'Nuevo cliente'}
              </h3>
            </div>
          </div>

          <form className="data-form" onSubmit={saveClient}>
            <label htmlFor="name">Nombre responsable</label>
            <input
              id="name"
              value={formData.name}
              onChange={(event) => updateFormField('name', event.target.value)}
            />

            <label htmlFor="petName">Nombre mascota</label>
            <input
              id="petName"
              value={formData.petName}
              onChange={(event) => updateFormField('petName', event.target.value)}
            />

            <label htmlFor="petType">Tipo de mascota</label>
            <input
              id="petType"
              placeholder="Perrito, gatito, conejo..."
              value={formData.petType}
              onChange={(event) => updateFormField('petType', event.target.value)}
            />

            <label htmlFor="phone">Telefono</label>
            <input
              id="phone"
              value={formData.phone}
              onChange={(event) => updateFormField('phone', event.target.value)}
            />

            <label htmlFor="email">Correo opcional</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) => updateFormField('email', event.target.value)}
            />

            {formError && <p className="form-error">{formError}</p>}

            <div className="form-actions">
              <button type="submit">
                {editingClientId ? 'Guardar cambios' : 'Agregar cliente'}
              </button>
              {editingClientId && (
                <button className="secondary-button" type="button" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel-card" aria-labelledby="client-list-title">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Listado</p>
              <h3 id="client-list-title">{clients.length} fichas guardadas</h3>
            </div>
          </div>

          <label className="search-box" htmlFor="clientSearch">
            Buscar cliente o mascota
            <input
              id="clientSearch"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Ej: Luna, perro, Camila..."
            />
          </label>

          <div className="client-list">
            {filteredClients.map((client) => (
              <article className="client-row client-row-with-actions" key={client.id}>
                <span>
                  <strong>{client.petName}</strong>
                  {client.petType} de {client.name}
                </span>
                <div className="row-actions">
                  <Link to={`/clientes/${client.id}`}>Ver</Link>
                  <button type="button" onClick={() => startEditingClient(client)}>
                    Editar
                  </button>
                  <button type="button" onClick={() => askToDeleteClient(client.id)}>
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <p className="empty-list">No hay resultados con esa busqueda.</p>
          )}
        </section>
      </div>

      {clientIdToDelete && (
        <div className="delete-confirmation" role="alert">
          <span>Quieres eliminar esta ficha?</span>
          <button type="button" onClick={confirmDeleteClient}>
            Si, eliminar
          </button>
          <button type="button" onClick={() => setClientIdToDelete(null)}>
            Cancelar
          </button>
        </div>
      )}
    </section>
  )
}
