import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute   from './PrivateRoute'
import RoleRoute      from './RoleRoute'

import Login          from '../pages/auth/Login'
import Dashboard      from '../pages/user/Dashboard'
import HostDashboard  from '../pages/host/HostDashboard'
import AdminPanel     from '../pages/admin/AdminPanel'


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/unauthorized"    element={<Unauthorized />} />

        {/* All authenticated users */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard"     element={<Dashboard />} />
          <Route path="/profile"       element={<Profile />} />

          {/* Host only */}
          <Route element={<RoleRoute allowedRoles={['host']} />}>
            <Route path="/host/dashboard"  element={<HostDashboard />} />
            <Route path="/host/listings"   element={<Listings />} />
          </Route>

          {/* Admin only */}
          <Route element={<RoleRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminPanel />} />
            <Route path="/admin/users"     element={<AdminUsers />} />
          </Route>

          {/* Shared — host + admin */}
          <Route element={<RoleRoute allowedRoles={['host', 'admin']} />}>
            <Route path="/analytics"      element={<Analytics />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
         </BrowserRouter>
  )
}