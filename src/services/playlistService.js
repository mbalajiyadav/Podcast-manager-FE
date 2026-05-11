/**
 * Mock Service for Playlist Data
 * In production, these would be API calls using axiosInstance
 */

const mockPlaylist = [
  { 
    id: 1, 
    title: 'The Vanishing of Room 12', 
    host: 'Priya Menon', 
    category: 'True Crime', 
    duration: '38 min', 
    plays: '8.2k', 
    artColor: '#713600', 
    isCurrentlyPlaying: true 
  },
  { 
    id: 2, 
    title: 'Morning Rituals That Work', 
    host: 'Ravi Krishnan', 
    category: 'Self-improvement', 
    duration: '42 min', 
    plays: '6.7k', 
    artColor: '#38240D', 
    isCurrentlyPlaying: false 
  },
  { 
    id: 3, 
    title: 'Late Night Frequencies Vol. 4', 
    host: 'DJ Kapoor', 
    category: 'Music', 
    duration: '60 min', 
    plays: '5.4k', 
    artColor: '#C05800', 
    isCurrentlyPlaying: false 
  },
  { 
    id: 4, 
    title: 'The Startup Grind #42', 
    host: 'Arjun Sharma', 
    category: 'Business', 
    duration: '51 min', 
    plays: '3.1k', 
    artColor: '#71360088', 
    isCurrentlyPlaying: false 
  },
  { 
    id: 5, 
    title: 'Totally Unscripted Ep. 9', 
    host: 'Meera & Zaid', 
    category: 'Comedy', 
    duration: '44 min', 
    plays: '5.1k', 
    artColor: '#38240D', 
    isCurrentlyPlaying: false 
  }
];

export const playlistService = {
  /**
   * Get all episodes in the user's playlist
   */
  getUserPlaylist: async () => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: mockPlaylist,
          totalDuration: '4h 12min',
          totalCount: mockPlaylist.length + 2 // Matching the "7 saved episodes" in design
        });
      }, 500);
    });
  },

  /**
   * Remove an episode from the playlist
   */
  removeFromPlaylist: async (episodeId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Episode removed from playlist' });
      }, 300);
    });
  }
};
