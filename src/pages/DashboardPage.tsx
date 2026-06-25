import { Link } from 'react-router-dom'
import { DASHBOARD_STATS, SAMPLE_CLIENTS } from '../data/mockData'

export function DashboardPage() {
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
        {DASHBOARD_STATS.map((stat) => (
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
          <span className="pill">Demo localStorage pronto</span>
        </div>

        <div className="client-list">
          {SAMPLE_CLIENTS.map((client) => (
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
