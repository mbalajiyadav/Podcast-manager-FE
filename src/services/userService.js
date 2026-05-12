import api from './axiosInstance';

export const userService = {
  /**
   * Get basic profile info for the current user
   */
  getListenerProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      const user = response.data;
      
      return {
        name: `${user.first_name} ${user.last_name}`,
        handle: `@${user.first_name.toLowerCase()}${user.last_name.toLowerCase()}`,
        since: 'May 2026',
        bio: 'Avid podcast listener. Always looking for a good story.',
        location: user.location || 'India',
        initials: `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`,
        stats: {
          episodesPlayed: 0,
          hoursListened: '0h',
          hoursGrowth: '0h',
          savedEpisodes: 0,
          hostsFollowed: 0
        }
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  /**
   * Get activity data (playlists, history, categories, hosts)
   */
  getListenerActivity: async () => {
    try {
      const playlistRes = await api.get('/playlist');
      
      return {
        playlist: playlistRes.data.map(item => ({
          id: item.podcast_id?._id,
          title: item.podcast_id?.title,
          host: item.podcast_id?.channel_id?.name || 'Unknown Host',
          category: item.podcast_id?.content_type_id?.type_description || 'Podcast',
          duration: `${Math.floor((item.podcast_id?.duration_in_seconds || 0) / 60)} min`,
          artClass: 'c1',
          icon: 'mic'
        })),
        history: [], // History not fully implemented in backend yet
        categories: [],
        followedHosts: []
      };
    } catch (error) {
      console.error('Error fetching listener activity:', error);
      return {
        playlist: [],
        history: [],
        categories: [],
        followedHosts: []
      };
    }
  }
};
