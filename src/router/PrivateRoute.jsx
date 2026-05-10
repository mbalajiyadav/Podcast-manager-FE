import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../features/auth/authSlice'

export default function PrivateRoute() {
  const isAuth    = useSelector(selectIsAuth)
  const location  = useLocation()

  if (!isAuth) {
    // Save where they tried to go → redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />   // renders the child route
}