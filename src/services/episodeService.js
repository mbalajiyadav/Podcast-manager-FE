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
        audioUrl: ep.playback_url || ep.content_url,
        imageUrl: ep.thumbnail_key || ep.channel_id?.cover_image_key || 'https://via.placeholder.com/200',
        hostStats: {
          episodeCount: 1, 
          totalPlays: ep.views_count?.toLocaleString() || '0'
        },
        channelId: ep.channel_id?._id || ep.channel_id,
        isFollowing: ep.isFollowing,
        isSaved: ep.isSaved
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
   * Increment play count for an episode
   */
  incrementPlayCount: async (id) => {
    try {
      await api.post(`/episodes/${id}/play`);
      return true;
    } catch (error) {
      console.error('Error incrementing play count:', error);
      return false;
    }
  },

  /**
   * Save episode to playlist
   */
  saveToPlaylist: async (id) => {
    try {
      const response = await api.post(`/playlist/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error saving to playlist:', error);
      throw error;
    }
  },

  /**
   * Remove from playlist
   */
  removeFromPlaylist: async (id) => {
    try {
      await api.delete(`/playlist/${id}`);
      return true;
    } catch (error) {
      console.error('Error removing from playlist:', error);
      return false;
    }
  },

  /**
   * Get user's playlist
   */
  getUserPlaylist: async () => {
    try {
      const response = await api.get('/playlist');
      return response.data.map(item => ({
        id: item.podcast_id._id,
        title: item.podcast_id.title,
        host: item.podcast_id.channel_id?.name || 'Unknown',
        duration: `${Math.floor(item.podcast_id.duration_in_seconds / 60)} min`,
        imageUrl: item.podcast_id.thumbnail_key || item.podcast_id.channel_id?.cover_image_key,
        savedAt: item.saved_at
      }));
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return [];
    }
  },

  /**
   * Toggle follow status for a host/channel
   */
  toggleFollowHost: async (channelId) => {
    try {
      const response = await api.post(`/users/follow/${channelId}`);
      return { success: true, isFollowing: response.data.isFollowing };
    } catch (error) {
      console.error('Error toggling follow:', error);
      return { success: false };
    }
  }
};
