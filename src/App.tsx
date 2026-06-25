import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppointmentDetailPage } from './pages/AppointmentDetailPage'
import { AppointmentsPage } from './pages/AppointmentsPage'
import { ClientDetailPage } from './pages/ClientDetailPage'
import { ClientsPage } from './pages/ClientsPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { ServicesPage } from './pages/ServicesPage'
import './App.css'

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* Todo lo que esta dentro de ProtectedRoute requiere sesion iniciada. */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="clientes" element={<ClientsPage />} />
        <Route path="clientes/:clientId" element={<ClientDetailPage />} />
        <Route path="citas" element={<AppointmentsPage />} />
        <Route path="citas/:appointmentId" element={<AppointmentDetailPage />} />
        <Route path="servicios" element={<ServicesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
