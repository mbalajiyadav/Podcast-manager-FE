import axios from 'axios';
import api from './axiosInstance';

export const hostService = {
  /**
   * Get dashboard statistics for the host
   */
  getDashboardStats: async () => {
    try {
      const response = await api.get('/episodes/my');
      const episodes = response.data;

      const totalEpisodes = episodes.length;
      const approvedEpisodes = episodes.filter(ep => ep.approval_status_id?.approval_code === 'APPROVED').length;
      const pendingReview = episodes.filter(ep => ep.approval_status_id?.approval_code === 'PENDING').length;
      const totalPlaysCount = episodes.reduce((acc, ep) => acc + (ep.views_count || 0), 0);

      return {
        totalEpisodes,
        episodesThisMonth: episodes.filter(ep => {
          const date = new Date(ep.created_on);
          const now = new Date();
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).length,
        totalPlays: totalPlaysCount.toLocaleString(),
        playsGrowth: '0%', // Mock growth for now
        pendingReview,
        approvedEpisodes
      };
    } catch (error) {
      console.error('Error fetching host dashboard stats:', error);
      return { totalEpisodes: 0, episodesThisMonth: 0, totalPlays: '0', playsGrowth: '0%', pendingReview: 0, approvedEpisodes: 0 };
    }
  },

  /**
   * Get recent episodes for the host
   */
  getRecentEpisodes: async () => {
    try {
      const response = await api.get('/episodes/my');
      return response.data.map(ep => ({
        id: ep._id,
        title: ep.title,
        category: ep.content_type_id?.type_description || 'Podcast',
        uploadDate: new Date(ep.created_on).toLocaleDateString(),
        plays: ep.views_count || 0,
        status: ep.approval_status_id?.approval_code?.toLowerCase() || 'pending'
      }));
    } catch (error) {
      console.error('Error fetching recent episodes:', error);
      return [];
    }
  },

  /**
   * Upload file directly to S3 using a Pre-signed URL
   * This bypasses Vercel's 4.5MB limit.
   */
  async uploadFile(file, onProgress) {
    try {
      // 1. Get the pre-signed URL from our backend
      const { data: ticket } = await api.get('/upload/presigned', {
        params: {
          fileName: file.name,
          fileType: file.type
        }
      });

      // 2. Upload directly to S3 using the ticket
      // We use a clean axios instance to avoid sending our JWT to S3
      await axios.put(ticket.uploadUrl, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        }
      });

      return {
        audio_s3_key: ticket.key,
        url: ticket.publicUrl,
        duration: 300, // Placeholder
        format: file.type.split('/')[1]?.toUpperCase() || 'MP3'
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  /**
   * Submit the episode form
   */
  submitEpisode: async (submissionData) => {
    try {
      // If it's FormData, convert to plain object for the JSON API
      const isFormData = submissionData instanceof FormData;
      const data = isFormData ? {
        title: submissionData.get('title'),
        description: submissionData.get('description'),
        category_name: submissionData.get('category'),
        audio_s3_key: submissionData.get('audio_s3_key'),
        duration_in_seconds: 300
      } : submissionData;

      const response = await api.post('/episodes', data);
      return { success: true, message: 'Episode submitted successfully for review!' };
    } catch (error) {
      console.error('Error submitting episode:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to submit episode' };
    }
  },

  /**
   * Get channel info
   */
  getChannelInfo: async () => {
    try {
      const [channelRes, episodesRes] = await Promise.all([
        api.get('/channels/my'),
        api.get('/episodes/my')
      ]);
      
      const channels = channelRes.data;
      const episodes = episodesRes.data;

      if (channels.length > 0) {
        const channel = channels[0];
        return {
          id: channel._id,
          name: channel.name,
          episodeCount: episodes.length,
          role: 'Host'
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching channel info:', error);
      return null;
    }
  },

  /**
   * Get host profile data
   */
  getHostProfile: async () => {
    try {
      const userRes = await api.get('/auth/me');
      const user = userRes.data;

      let channel = {};
      try {
        const channelRes = await api.get('/channels/my');
        channel = channelRes.data[0] || {};
      } catch (e) {
        console.warn("Could not fetch channel, using defaults");
      }

      let episodes = [];
      try {
        const episodesRes = await api.get('/episodes/my');
        episodes = episodesRes.data || [];
      } catch (e) {
        console.warn("Could not fetch episodes, using defaults");
      }

      return {
        name: `${user.first_name} ${user.last_name}`,
        handle: `@${user.first_name.toLowerCase()}`,
        since: 'May 2026',
        bio: channel.description || 'Podcast host.',
        location: user.location || 'India',
        category: channel.category_id?.type_description || 'Various',
        website: 'mysite.com',
        initials: `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`,
        stats: {
          episodes: {
            total: episodes.length,
            live: episodes.filter(e => e.approval_status_id?.approval_code === 'APPROVED').length,
            pending: episodes.filter(e => e.approval_status_id?.approval_code === 'PENDING').length,
            rejected: episodes.filter(e => e.approval_status_id?.approval_code === 'REJECTED').length
          },
          plays: {
            total: episodes.reduce((acc, e) => acc + (e.views_count || 0), 0).toLocaleString(),
            growth: '0%'
          },
          followers: { total: '0', growth: '0' },
          avgDuration: '45 min'
        }
      };
    } catch (error) {
      console.error('Error fetching host profile:', error);
      return null;
    }
  },

  /**
   * Get host episodes for profile grid
   */
  getHostEpisodes: async () => {
    try {
      const response = await api.get('/episodes/my');
      return response.data.map(ep => ({
        id: ep._id,
        title: ep.title,
        category: ep.content_type_id?.type_description || 'Podcast',
        plays: ep.views_count?.toLocaleString() || '0',
        status: ep.approval_status_id?.approval_code === 'APPROVED' ? 'Approved' : 'Pending',
        artClass: 'a1'
      }));
    } catch (error) {
      console.error('Error fetching host episodes:', error);
      return [];
    }
  }
};
