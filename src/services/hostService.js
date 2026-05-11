/**
 * Mock Service for Host Dashboard Data
 */

export const hostService = {
  /**
   * Get dashboard statistics for the host
   */
  getDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalEpisodes: 43,
          episodesThisMonth: 2,
          totalPlays: '62.4k',
          playsGrowth: '18%',
          pendingReview: 2,
          approvedEpisodes: 40
        });
      }, 500);
    });
  },

  /**
   * Get recent episodes for the host
   */
  getRecentEpisodes: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 101,
            title: 'The Startup Grind #43',
            category: 'Business',
            uploadDate: 'May 9, 2026',
            plays: 320,
            status: 'pending'
          },
          {
            id: 102,
            title: 'Fundraising 101 — Ep. 42',
            category: 'Business',
            uploadDate: 'Apr 28, 2026',
            plays: '3,120',
            status: 'approved'
          },
          {
            id: 103,
            title: 'Pitch Perfect — Ep. 41',
            category: 'Business',
            uploadDate: 'Apr 15, 2026',
            plays: '4,880',
            status: 'approved'
          },
          {
            id: 104,
            title: 'Low effort promo cut',
            category: 'Business',
            uploadDate: 'Apr 3, 2026',
            plays: 0,
            status: 'rejected'
          },
          {
            id: 105,
            title: 'Building the MVP — Ep. 40',
            category: 'Business',
            uploadDate: 'Mar 20, 2026',
            plays: '7,200',
            status: 'approved'
          }
        ]);
      }, 500);
    });
  },

  /**
   * Simulate file upload with progress
   */
  uploadFile: async (file, onProgress) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (onProgress) onProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve({
            url: `https://cdn.podcast.com/uploads/${file.name}`,
            duration: '51 min',
            format: file.type.split('/')[1].toUpperCase(),
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          });
        }
      }, 300);
    });
  },

  /**
   * Submit the episode form (using FormData for multer compatibility)
   */
  submitEpisode: async (formData) => {
    // In real app: return axiosInstance.post('/episodes', formData)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Episode submitted for review' });
      }, 1000);
    });
  },

  /**
   * Get channel info
   */
  getChannelInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'The Startup Grind',
          episodeCount: 43,
          role: 'Host'
        });
      }, 300);
    });
  },

  /**
   * Get host profile data
   */
  getHostProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Arjun Sharma',
          handle: '@arjun',
          since: 'Jan 2026',
          bio: 'Founder, investor, and storyteller. I run The Startup Grind — a weekly podcast about the realities of building companies in India and beyond. No fluff, just honest conversations.',
          location: 'Bangalore, India',
          category: 'Business',
          website: 'startupgrind.in',
          initials: 'AS',
          stats: {
            episodes: { total: 43, live: 40, pending: 2, rejected: 1 },
            plays: { total: '62.4k', growth: '18%' },
            followers: { total: '1,240', growth: '84' },
            avgDuration: '48 min'
          }
        });
      }, 500);
    });
  },

  /**
   * Get host episodes for profile grid
   */
  getHostEpisodes: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'The Startup Grind #43 — Fundraising 101', category: 'Business', plays: '3.1k', status: 'Approved', artClass: 'a2' },
          { id: 2, title: 'The Startup Grind #44 — Product-Market Fit', category: 'Business', plays: '0', status: 'Pending', artClass: 'a1' },
          { id: 3, title: 'Building the MVP — Ep. 40', category: 'Business', plays: '7.2k', status: 'Approved', artClass: 'a3' }
        ]);
      }, 500);
    });
  }
};
