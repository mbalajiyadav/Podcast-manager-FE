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
        bio: user.bio || 'Avid podcast listener. Always looking for a good story.',
        location: user.location || 'India',
        initials: `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`,
        followedChannels: user.followed_channels || [],
        stats: {
          episodesPlayed: user.episodes_played || 0,
          hoursListened: user.hours_listened || '0h',
          hoursGrowth: '0h',
          savedEpisodes: user.saved_count || 0,
          hostsFollowed: user.followed_channels?.length || 0
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
      const [playlistRes, profileRes] = await Promise.all([
        api.get('/playlist'),
        api.get('/auth/me')
      ]);
      
      const user = profileRes.data;

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
        history: [], 
        categories: [
          { name: 'Business', percentage: 70, count: 12 },
          { name: 'Comedy', percentage: 45, count: 8 },
          { name: 'True Crime', percentage: 30, count: 5 }
        ],
        followedHosts: (user.followed_channels || []).map(ch => ({
          id: ch._id,
          name: ch.name,
          initials: ch.name.substring(0, 2).toUpperCase(),
          bg: '#C05800',
          episodes: 'Active'
        }))
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
