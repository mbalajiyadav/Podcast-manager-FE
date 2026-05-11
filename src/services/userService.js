/**
 * Mock Service for User Profile and Activity Data
 */

export const userService = {
  /**
   * Get basic profile info for the listener
   */
  getListenerProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Neha Kulkarni',
          handle: '@neha_k',
          since: 'Mar 2026',
          bio: 'Avid podcast listener. Into true crime, business, and the occasional deep-dive history episode. Always looking for a good story.',
          location: 'Hyderabad, India',
          initials: 'NK',
          stats: {
            episodesPlayed: 184,
            hoursListened: '142h',
            hoursGrowth: '12h',
            savedEpisodes: 37,
            hostsFollowed: 9
          }
        });
      }, 500);
    });
  },

  /**
   * Get activity data (playlists, history, categories, hosts)
   */
  getListenerActivity: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          playlist: [
            { id: 1, title: 'The Vanishing of Room 12', host: 'Priya Menon', category: 'True Crime', duration: '38 min', artClass: 'c1', icon: 'mic' },
            { id: 2, title: 'Morning Rituals That Work', host: 'Ravi Krishnan', category: 'Self-improvement', duration: '42 min', artClass: 'c2', icon: 'brain' },
            { id: 3, title: 'Late Night Frequencies Vol. 4', host: 'DJ Kapoor', category: 'Music', duration: '60 min', artClass: 'c3', icon: 'music' },
            { id: 4, title: 'The Startup Grind #42', host: 'Arjun Sharma', category: 'Business', duration: '51 min', artClass: 'c1', icon: 'currency' }
          ],
          history: [
            { id: 101, title: 'The Vanishing of Room 12', host: 'Priya Menon', timeAgo: '2 hrs ago', progress: 60, artColor: '#38240D', icon: 'mic' },
            { id: 102, title: 'Race Day Mindset', host: 'Coach Nair', timeAgo: 'Yesterday', progress: 100, artColor: '#713600', icon: 'run' },
            { id: 103, title: 'Totally Unscripted Ep. 9', host: 'Meera & Zaid', timeAgo: '2 days ago', progress: 85, artColor: '#C05800aa', icon: 'mood' },
            { id: 104, title: 'Morning Rituals That Work', host: 'Ravi Krishnan', timeAgo: '3 days ago', progress: 100, artColor: '#38240D', icon: 'brain' }
          ],
          categories: [
            { name: 'True Crime', count: 52, percentage: 82 },
            { name: 'Business', count: 41, percentage: 64 },
            { name: 'Music', count: 30, percentage: 48 },
            { name: 'Comedy', count: 23, percentage: 36 }
          ],
          followedHosts: [
            { initials: 'PM', name: 'Priya Menon', episodes: 24, bg: '#713600' },
            { initials: 'AS', name: 'Arjun Sharma', episodes: 43, bg: '#C05800' },
            { initials: 'RK', name: 'Ravi Krishnan', episodes: 18, bg: '#38240D' },
            { initials: 'DK', name: 'DJ Kapoor', episodes: 11, bg: '#71360088' },
            { initials: 'MZ', name: 'Meera & Zaid', episodes: 10, bg: '#C05800aa' }
          ]
        });
      }, 500);
    });
  }
};
