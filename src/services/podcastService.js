import api from './axiosInstance';

export const podcastService = {
  /**
   * Search for episodes based on a query string.
   * Fetches real approved episodes from the backend.
   */
  searchPodcasts: async (query, signal) => {
    try {
      const response = await api.get('/episodes', { signal });
      const episodes = response.data;
      
      // Map backend Episode to frontend interface
      const mappedEpisodes = episodes.map(ep => ({
        id: ep._id,
        title: ep.title,
        author: ep.channel_id?.host_id ? `${ep.channel_id.host_id.first_name || ''} ${ep.channel_id.host_id.last_name || ''}`.trim() : 'Unknown Host',
        description: ep.description,
        category: ep.content_type_id?.type_description || 'Podcast',
        imageUrl: ep.thumbnail_key || ep.channel_id?.cover_image_key || 'https://via.placeholder.com/200',
        addedAt: ep.created_on,
        playCount: ep.views_count || 0,
        duration: `${Math.floor(ep.duration_in_seconds / 60)} min`
      }));

      if (!query) return mappedEpisodes;

      const lowerQuery = query.toLowerCase();
      return mappedEpisodes.filter(ep => 
        ep.title.toLowerCase().includes(lowerQuery) ||
        ep.author.toLowerCase().includes(lowerQuery) ||
        ep.category.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') return [];
      console.error('Error fetching episodes:', error);
      throw error;
    }
  },

  /**
   * Get podcast details by ID
   */
  getPodcastById: async (id) => {
    try {
      const response = await api.get(`/channels/${id}`);
      const { channel, episodes } = response.data;
      
      return {
        id: channel._id,
        title: channel.name,
        author: channel.host_id ? `${channel.host_id.first_name || ''} ${channel.host_id.last_name || ''}`.trim() : 'Unknown Host',
        description: channel.description,
        category: channel.category_id?.category_name || 'Uncategorized',
        episodeCount: episodes.length,
        imageUrl: channel.cover_image_key || 'https://via.placeholder.com/200',
        addedAt: channel.created_on,
        episodes: episodes.map(ep => ({
          id: ep._id,
          title: ep.title,
          description: ep.description,
          duration: `${Math.floor(ep.duration_in_seconds / 60)} min`,
          plays: ep.views_count || 0,
          audioUrl: ep.content_url || ep.audio_s3_key,
          imageUrl: ep.thumbnail_key || channel.cover_image_key
        }))
      };
    } catch (error) {
      console.error(`Error fetching channel ${id}:`, error);
      return null;
    }
  }
};
