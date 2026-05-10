import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Unauthorized from '../pages/auth/Unauthorized'

// User Pages
import Dashboard from '../pages/user/Dashboard'
import Profile from '../pages/user/Profile'

// Host Pages
import HostDashboard from '../pages/host/HostDashboard'
import Listings from '../pages/host/Listings'

// Admin Pages
import AdminPanel from '../pages/admin/AdminPanel'
import AdminUsers from '../pages/admin/AdminUsers'

// Common Pages
import Analytics from '../pages/common/Analytics'
import NotFound from '../pages/common/NotFound'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Authenticated routes (flattened for now) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Host routes */}
        <Route path="/host/dashboard" element={<HostDashboard />} />
        <Route path="/host/listings" element={<Listings />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Shared routes */}
        <Route path="/analytics" element={<Analytics />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}