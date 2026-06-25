import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Service, ServiceFormData } from '../types'
import { getStoredServices, saveStoredServices } from '../utils/serviceStorage'

const EMPTY_SERVICE_FORM: ServiceFormData = {
  name: '',
  description: '',
  price: 0,
  durationMinutes: 30,
  active: true,
}

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>(() => getStoredServices())
  const [formData, setFormData] = useState<ServiceFormData>(EMPTY_SERVICE_FORM)
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [serviceIdToDelete, setServiceIdToDelete] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    setServices(getStoredServices())
  }, [])

  const filteredServices = services.filter((service) => {
    const searchValue = searchText.trim().toLowerCase()

    if (!searchValue) {
      return true
    }

    return (
      service.name.toLowerCase().includes(searchValue) ||
      service.description.toLowerCase().includes(searchValue)
    )
  })

  function updateTextField(fieldName: 'name' | 'description', value: string) {
    setFormData({
      ...formData,
      [fieldName]: value,
    })
  }

  function updateNumberField(fieldName: 'price' | 'durationMinutes', value: string) {
    setFormData({
      ...formData,
      [fieldName]: Number(value),
    })
  }

  function saveService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    if (!formData.name || !formData.description || formData.price <= 0) {
      setFormError('Completa nombre, descripcion y un precio mayor a cero.')
      return
    }

    const nextServices = editingServiceId
      ? services.map((service) =>
          service.id === editingServiceId ? { ...formData, id: editingServiceId } : service,
        )
      : [...services, { ...formData, id: `servicio-${Date.now()}` }]

    setServices(nextServices)
    saveStoredServices(nextServices)
    resetForm()
  }

  function startEditingService(service: Service) {
    setEditingServiceId(service.id)
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      durationMinutes: service.durationMinutes,
      active: service.active,
    })
    setFormError('')
  }

  function toggleServiceStatus(serviceId: string) {
    const nextServices = services.map((service) =>
      service.id === serviceId ? { ...service, active: !service.active } : service,
    )

    setServices(nextServices)
    saveStoredServices(nextServices)
  }

  function askToDeleteService(serviceId: string) {
    setServiceIdToDelete(serviceId)
  }

  function confirmDeleteService() {
    if (!serviceIdToDelete) {
      return
    }

    const nextServices = services.filter((service) => service.id !== serviceIdToDelete)
    setServices(nextServices)
    saveStoredServices(nextServices)
    setServiceIdToDelete(null)
  }

  function resetForm() {
    setFormData(EMPTY_SERVICE_FORM)
    setEditingServiceId(null)
    setFormError('')
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Catalogo interno</p>
        <h2>Servicios</h2>
        <p>
          Administra los servicios que despues se pueden usar al crear citas.
        </p>
      </div>

      <div className="crud-layout">
        <section className="panel-card" aria-labelledby="service-form-title">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Formulario</p>
              <h3 id="service-form-title">
                {editingServiceId ? 'Editar servicio' : 'Nuevo servicio'}
              </h3>
            </div>
          </div>

          <form className="data-form" onSubmit={saveService}>
            <label htmlFor="serviceName">Nombre</label>
            <input
              id="serviceName"
              value={formData.name}
              onChange={(event) => updateTextField('name', event.target.value)}
            />

            <label htmlFor="serviceDescription">Descripcion</label>
            <textarea
              id="serviceDescription"
              value={formData.description}
              onChange={(event) => updateTextField('description', event.target.value)}
            />

            <label htmlFor="servicePrice">Precio</label>
            <input
              id="servicePrice"
              min="0"
              type="number"
              value={formData.price}
              onChange={(event) => updateNumberField('price', event.target.value)}
            />

            <label htmlFor="serviceDuration">Duracion en minutos</label>
            <input
              id="serviceDuration"
              min="5"
              type="number"
              value={formData.durationMinutes}
              onChange={(event) => updateNumberField('durationMinutes', event.target.value)}
            />

            {formError && <p className="form-error">{formError}</p>}

            <div className="form-actions">
              <button type="submit">
                {editingServiceId ? 'Guardar cambios' : 'Agregar servicio'}
              </button>
              {editingServiceId && (
                <button className="secondary-button" type="button" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel-card" aria-labelledby="services-list-title">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Listado</p>
              <h3 id="services-list-title">{services.length} servicios guardados</h3>
            </div>
          </div>

          <label className="search-box" htmlFor="serviceSearch">
            Buscar servicio
            <input
              id="serviceSearch"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Ej: paseo, bano, corte..."
            />
          </label>

          <div className="service-grid">
            {filteredServices.map((service) => (
              <article className="service-card" key={service.id}>
                <div className="section-title-row">
                  <div>
                    <h3>{service.name}</h3>
                    <span className="status-pill">
                      {service.active ? 'activo' : 'pausado'}
                    </span>
                  </div>
                </div>
                <p>{service.description}</p>
                <strong>${service.price.toLocaleString('es-CL')}</strong>
                <small>{service.durationMinutes} minutos aprox.</small>
                <div className="row-actions">
                  <button type="button" onClick={() => startEditingService(service)}>
                    Editar
                  </button>
                  <button type="button" onClick={() => toggleServiceStatus(service.id)}>
                    {service.active ? 'Pausar' : 'Activar'}
                  </button>
                  <button type="button" onClick={() => askToDeleteService(service.id)}>
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <p className="empty-list">No hay servicios con esa busqueda.</p>
          )}
        </section>
      </div>

      {serviceIdToDelete && (
        <div className="delete-confirmation" role="alert">
          <span>Quieres eliminar este servicio?</span>
          <button type="button" onClick={confirmDeleteService}>
            Si, eliminar
          </button>
          <button type="button" onClick={() => setServiceIdToDelete(null)}>
            Cancelar
          </button>
        </div>
      )}
    </section>
  )
}
