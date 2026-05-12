import api from './axiosInstance';

export const playlistService = {
  /**
   * Get all episodes in the user's playlist
   */
  getUserPlaylist: async () => {
    try {
      const response = await api.get('/playlist');
      const playlist = response.data;
      
      const mappedPlaylist = playlist.map(item => ({
        id: item.podcast_id?._id,
        title: item.podcast_id?.title,
        host: item.podcast_id?.channel_id?.name || 'Unknown Host',
        category: item.podcast_id?.content_type_id?.type_description || 'Podcast',
        duration: `${Math.floor((item.podcast_id?.duration_in_seconds || 0) / 60)} min`,
        plays: item.podcast_id?.views_count?.toLocaleString() || '0',
        artColor: '#713600', // Default
        isCurrentlyPlaying: false
      }));

      const totalDurationSec = playlist.reduce((acc, item) => acc + (item.podcast_id?.duration_in_seconds || 0), 0);
      const hours = Math.floor(totalDurationSec / 3600);
      const minutes = Math.floor((totalDurationSec % 3600) / 60);

      return {
        data: mappedPlaylist,
        totalDuration: `${hours}h ${minutes}min`,
        totalCount: mappedPlaylist.length
      };
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return { data: [], totalDuration: '0h 0min', totalCount: 0 };
    }
  },

  /**
   * Add an episode to the playlist
   */
  addToPlaylist: async (episodeId) => {
    try {
      await api.post(`/playlist/${episodeId}`);
      return { success: true };
    } catch (error) {
      console.error('Error adding to playlist:', error);
      throw error;
    }
  },

  /**
   * Remove an episode from the playlist
   */
  removeFromPlaylist: async (episodeId) => {
    try {
      await api.delete(`/playlist/${episodeId}`);
      return { success: true, message: 'Episode removed from playlist' };
    } catch (error) {
      console.error('Error removing from playlist:', error);
      throw error;
    }
  }
};
