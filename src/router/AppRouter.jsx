import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Unauthorized from '../pages/auth/Unauthorized'

// User Pages
import Browse from '../pages/user/Browse'
import Profile from '../pages/user/Profile'
import Playlist from '../pages/user/Playlist'
import EpisodeDetail from '../pages/user/EpisodeDetail'

// Host Pages
import HostDashboard from '../pages/host/HostDashboard'
import HostProfile from '../pages/host/HostProfile'
import Listings from '../pages/host/Listings'
import UploadEpisode from '../pages/host/UploadEpisode'

// Admin Pages
import AdminPanel from '../pages/admin/AdminPanel'
import AdminUsers from '../pages/admin/AdminUsers'
import StatsPage from '../pages/admin/StatsPage'
import EpisodeReview from '../pages/admin/EpisodeReview'

// Common Pages
import Landing from '../pages/common/Landing'
import Analytics from '../pages/common/Analytics'
import SearchPage from '../pages/SearchPage'
import NotFound from '../pages/common/NotFound'

import MainLayout from '../components/layout/MainLayout'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Authenticated routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/episode/:id" element={<EpisodeDetail />} />

          {/* Host routes */}
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/host/listings" element={<Listings />} />
          <Route path="/host/upload" element={<UploadEpisode />} />
          <Route path="/host/profile" element={<HostProfile />} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/stats" element={<StatsPage />} />
          <Route path="/admin/review/:id" element={<EpisodeReview />} />

          {/* Shared routes */}
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}