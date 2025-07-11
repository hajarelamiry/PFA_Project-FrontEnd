import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './home/home'
import LoginPage from './home/login'
import RegisterPage from './home/register'
import ClientDashboard from './client/client_dashboard'
import TransporterDashboard from './transportation/transporter_dashboard'
import AdminDashboard from './admin/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App