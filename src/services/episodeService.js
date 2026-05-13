import api from './axiosInstance';

export const episodeService = {
  /**
   * Get single episode detail
   */
  getEpisodeDetails: async (id) => {
    try {
      const response = await api.get(`/episodes/${id}`);
      const ep = response.data;
      
      return {
        id: ep._id,
        title: ep.title,
        category: ep.content_type_id?.type_description || 'Podcast',
        host: ep.channel_id?.host_id ? `${ep.channel_id.host_id.first_name || ''} ${ep.channel_id.host_id.last_name || ''}`.trim() : 'Unknown Host',
        hostAvatar: ep.channel_id?.host_id?.first_name?.charAt(0) || 'H',
        plays: ep.views_count?.toLocaleString() || '0',
        duration: `${Math.floor(ep.duration_in_seconds / 60)} min`,
        date: new Date(ep.created_on).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: ep.description,
        audioUrl: ep.audio_s3_key ? `https://${process.env.VITE_AWS_BUCKET_NAME || 'podcast-manager-balaji'}.s3.ap-southeast-2.amazonaws.com/${ep.audio_s3_key}` : ep.content_url,
        imageUrl: ep.thumbnail_key || ep.channel_id?.cover_image_key || 'https://via.placeholder.com/200',
        hostStats: {
          episodeCount: 1, // Will be updated by real logic later
          totalPlays: ep.views_count?.toLocaleString() || '0'
        },
        hostId: ep.channel_id?.host_id?._id
      };
    } catch (error) {
      console.error(`Error fetching episode ${id}:`, error);
      return null;
    }
  },

  /**
   * Get more episodes from the same host/channel
   */
  getMoreFromHost: async (channelId) => {
    try {
      const response = await api.get('/episodes', { params: { channel: channelId } });
      const episodes = response.data;
      
      return episodes.map(ep => ({
        id: ep._id,
        title: ep.title,
        duration: `${Math.floor(ep.duration_in_seconds / 60)} min`,
        host: ep.channel_id?.name || 'Unknown'
      }));
    } catch (error) {
      console.error('Error fetching more from host:', error);
      return [];
    }
  },

  /**
   * Toggle follow host (Mocked as backend doesn't have follow system yet)
   */
  toggleFollowHost: async (hostId) => {
    // Backend doesn't have a follow system yet
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, following: true }), 300);
    });
  }
};
