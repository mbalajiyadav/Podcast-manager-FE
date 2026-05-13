import api from './axiosInstance';

export const adminService = {
  /**
   * Get platform statistics for the admin dashboard
   */
  getPlatformStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      const stats = response.data;
      return {
        totalEpisodes: stats.totalEpisodes.toLocaleString(),
        totalPlays: stats.totalPlays.toLocaleString(),
        activeHosts: stats.totalHosts,
        listeners: stats.totalListeners.toLocaleString()
      };
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return { totalEpisodes: '0', totalPlays: '0', activeHosts: 0, listeners: '0' };
    }
  },

  /**
   * Get list of episodes pending review
   */
  getPendingQueue: async () => {
    try {
      const response = await api.get('/episodes/pending');
      return response.data.map(ep => ({
        id: ep._id,
        title: ep.title,
        host: ep.user_id ? `${ep.user_id.first_name || ''} ${ep.user_id.last_name || ''}`.trim() : 'Unknown',
        timeAgo: new Date(ep.created_on).toLocaleDateString(),
        description: ep.description,
        category: ep.content_type_id?.type_description || 'Podcast',
        duration: `${Math.floor(ep.duration_in_seconds / 60)} min`
      }));
    } catch (error) {
      console.error('Error fetching pending queue:', error);
      return [];
    }
  },

  /**
   * Get summary of all users (paginated/filtered in real app)
   */
  getAllUsers: async (filters = {}) => {
    try {
      const sanitizedFilters = {};
      if (filters.role && filters.role !== 'All roles') {
        sanitizedFilters.role = filters.role === 'Hosts' ? 'HOST' : 'LISTENER';
      }
      if (filters.status && filters.status !== 'All statuses') {
        sanitizedFilters.status = filters.status.toLowerCase();
      }
      if (filters.search) {
        sanitizedFilters.search = filters.search;
      }

      const response = await api.get('/users', { params: sanitizedFilters });
      const users = response.data.map(u => ({
        id: u._id,
        name: `${u.first_name} ${u.last_name}`,
        email: u.email_id,
        role: u.role_id?.role_code || 'LISTENER',
        joined: new Date(u.created_on).toLocaleDateString(),
        status: u.is_active ? 'Active' : 'Inactive',
        initials: `${(u.first_name || 'U').charAt(0)}${(u.last_name || '').charAt(0)}`
      }));
      return {
        users,
        totalCount: users.length
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { users: [], totalCount: 0 };
    }
  },

  /**
   * Get recent users for dashboard (alias for getAllUsers returning just array)
   */
  getRecentUsers: async () => {
    const data = await adminService.getAllUsers();
    return data.users;
  },

  /**
   * Get details for an episode under review
   */
  getEpisodeReviewData: async (id) => {
    try {
      const response = await api.get(`/episodes/${id}`);
      const ep = response.data;
      
      // Fetch host stats separately
      let hostStats = { totalEpisodes: 0, totalPlays: '0', approved: 0, rejected: 0 };
      let otherEpisodes = [];

      if (ep.user_id?._id) {
        try {
          const hostResponse = await api.get(`/users/${ep.user_id._id}`);
          const hostData = hostResponse.data;
          if (hostData.stats) {
            hostStats = {
              totalEpisodes: hostData.stats.totalEpisodes,
              totalPlays: hostData.stats.totalPlays.toLocaleString(),
              approved: hostData.stats.approved,
              rejected: hostData.stats.rejected
            };
          }
          if (hostData.recentEpisodes) {
            otherEpisodes = hostData.recentEpisodes.map(e => ({
              id: e.id,
              title: e.title,
              duration: e.duration,
              status: e.status
            }));
          }
        } catch (err) {
          console.error("Could not fetch host stats", err);
        }
      }

      return {
        id: ep._id,
        title: ep.title,
        host: ep.user_id ? `${ep.user_id.first_name || ''} ${ep.user_id.last_name || ''}`.trim() : 'Unknown',
        hostChannel: ep.channel_id?.name || 'Unknown Channel',
        category: ep.content_type_id?.type_description || 'Podcast',
        duration: `${Math.floor(ep.duration_in_seconds / 60)} min`,
        submittedAt: new Date(ep.created_on).toLocaleDateString(),
        fileInfo: `MP3 · ${(ep.duration_in_seconds * 0.1).toFixed(1)} MB`,
        description: ep.description,
        audioUrl: ep.playback_url || ep.content_url,
        hostStats: hostStats,
        otherEpisodes: otherEpisodes
      };
    } catch (error) {
      console.error(`Error fetching review data for ${id}:`, error);
      return null;
    }
  },

  /**
   * Update episode status (Approve/Reject)
   */
  updateEpisodeStatus: async (id, status, reason = '') => {
    try {
      const endpoint = status === 'approved' ? 'approve' : 'reject';
      await api.patch(`/episodes/${id}/${endpoint}`, { reason });
      return { success: true };
    } catch (error) {
      console.error('Error updating episode status:', error);
      throw error;
    }
  },

  /**
   * Update user status (Active/Inactive)
   */
  updateUserStatus: async (userId, status) => {
    try {
      const is_active = status === 'Active';
      await api.patch(`/users/${userId}/status`, { is_active });
      return { success: true, status };
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  },

  /**
   * Get all episodes for admin management
   */
  getAllEpisodes: async (filters = {}) => {
    try {
      const response = await api.get('/admin/episodes');
      const episodes = response.data.map(ep => ({
        id: ep._id,
        title: ep.title,
        host: ep.user_id ? `${ep.user_id.first_name || ''} ${ep.user_id.last_name || ''}`.trim() : 'Unknown',
        channel: ep.channel_id?.name || 'Unknown Channel',
        category: ep.content_type_id?.type_description || 'Podcast',
        status: ep.approval_status_id?.approval_code || 'PENDING',
        uploadedAt: new Date(ep.created_on).toLocaleDateString(),
        plays: ep.views_count || 0
      }));

      // Apply client-side filters if needed
      let filtered = episodes;
      if (filters.status && filters.status !== 'All statuses') {
        filtered = filtered.filter(ep => ep.status === filters.status.toUpperCase());
      }
      if (filters.search) {
        const s = filters.search.toLowerCase();
        filtered = filtered.filter(ep => 
          ep.title.toLowerCase().includes(s) || 
          ep.host.toLowerCase().includes(s) || 
          ep.channel.toLowerCase().includes(s)
        );
      }

      return {
        episodes: filtered,
        totalCount: episodes.length
      };
    } catch (error) {
      console.error('Error fetching all episodes:', error);
      return { episodes: [], totalCount: 0 };
    }
  }
};
