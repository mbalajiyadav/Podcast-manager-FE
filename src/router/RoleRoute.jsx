import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectRole } from '../features/auth/authSlice'

export default function RoleRoute({ allowedRoles }) {
  const role = useSelector(selectRole)

  // Case-insensitive check
  const isAllowed = role && allowedRoles.some(r => r.toUpperCase() === role.toUpperCase());

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}