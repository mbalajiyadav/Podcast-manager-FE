import api from './axiosInstance';

export const podcastService = {
  /**
   * Search for podcasts based on a query string.
   * Fetches real channels from the backend and filters them.
   */
  searchPodcasts: async (query, signal) => {
    try {
      const response = await api.get('/channels', { signal });
      const channels = response.data;
      
      // Map backend Channel to frontend Podcast interface
      const mappedPodcasts = channels.map(channel => ({
        id: channel._id,
        title: channel.name,
        author: channel.host_id ? `${channel.host_id.first_name || ''} ${channel.host_id.last_name || ''}`.trim() : 'Unknown Host',
        description: channel.description,
        category: channel.category_id?.category_name || 'Uncategorized',
        episodeCount: 0, // Backend doesn't provide this in list yet
        imageUrl: channel.cover_image_key || 'https://via.placeholder.com/200',
        addedAt: channel.created_on,
        rating: 4.5, // Placeholder as backend doesn't have ratings yet
        playCount: channel.views_count || 0
      }));

      if (!query) return mappedPodcasts;

      const lowerQuery = query.toLowerCase();
      return mappedPodcasts.filter(podcast => 
        podcast.title.toLowerCase().includes(lowerQuery) ||
        podcast.author.toLowerCase().includes(lowerQuery) ||
        podcast.category.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') return [];
      console.error('Error fetching podcasts:', error);
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
