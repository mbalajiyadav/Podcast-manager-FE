import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectRole } from '../features/auth/authSlice'

export default function RoleRoute({ allowedRoles }) {
  const role = useSelector(selectRole)

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}