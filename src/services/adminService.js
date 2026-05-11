/**
 * Mock Service for Admin Dashboard Data
 */

const mockPendingQueue = [
  {
    id: 1,
    title: 'The Startup Grind #44',
    host: 'Arjun Sharma',
    timeAgo: '2 hrs ago',
    description: 'In this episode, three founders discuss finding product-market fit...',
    category: 'Business',
    duration: '51 min'
  },
  {
    id: 2,
    title: 'Night Frequencies Vol. 5',
    host: 'DJ Kapoor',
    timeAgo: '5 hrs ago',
    description: 'A smooth late-night mix blending deep house and electronic grooves...',
    category: 'Music',
    duration: '60 min'
  },
  {
    id: 3,
    title: 'Race Day Mindset',
    host: 'Coach Nair',
    timeAgo: '8 hrs ago',
    description: 'Mental preparation techniques for endurance athletes on race day...',
    category: 'Sports',
    duration: '27 min'
  }
];

const mockAllUsers = [
  { id: 1, name: 'Priya Menon', email: 'priya@example.com', role: 'Host', stats: '24 eps · 142k plays', joined: 'Jan 12, 2026', status: 'Active', avatarBg: '#713600', initials: 'PM' },
  { id: 2, name: 'Arjun Sharma', email: 'arjun@example.com', role: 'Host', stats: '43 eps · 62k plays', joined: 'Feb 4, 2026', status: 'Active', avatarBg: '#C05800', initials: 'AS' },
  { id: 3, name: 'Neha Kulkarni', email: 'neha@example.com', role: 'Listener', stats: '— · 2.1k plays', joined: 'Mar 17, 2026', status: 'Active', avatarBg: '#38240D', initials: 'NK' },
  { id: 4, name: 'Zaid Hussain', email: 'zaid@example.com', role: 'Listener', stats: '— · 880 plays', joined: 'Apr 2, 2026', status: 'Inactive', avatarBg: '#71360088', initials: 'ZH' },
  { id: 5, name: 'Ravi Krishnan', email: 'ravi@example.com', role: 'Host', stats: '18 eps · 38k plays', joined: 'Dec 29, 2025', status: 'Active', avatarBg: '#C05800', initials: 'RK' },
  { id: 6, name: 'Meera Singh', email: 'meera@example.com', role: 'Host', stats: '9 eps · 11k plays', joined: 'Apr 21, 2026', status: 'Active', avatarBg: '#713600', initials: 'MS' },
  { id: 7, name: 'Coach Nair', email: 'coach.nair@example.com', role: 'Host', stats: '6 eps · 4.8k plays', joined: 'May 9, 2026', status: 'Active', avatarBg: '#38240D', initials: 'CN' }
];

export const adminService = {
  getPlatformStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalEpisodes: '2,418',
          totalPlays: '1.2M',
          activeHosts: 184,
          listeners: '12,400'
        });
      }, 500);
    });
  },

  getPendingQueue: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPendingQueue), 500);
    });
  },

  getRecentUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAllUsers.slice(0, 5)), 500);
    });
  },

  getAllUsers: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let users = [...mockAllUsers];
        if (filters.role && filters.role !== 'All roles') {
          const targetRole = filters.role === 'Hosts' ? 'Host' : 'Listener';
          users = users.filter(u => u.role === targetRole);
        }
        if (filters.status && filters.status !== 'All statuses') {
          users = users.filter(u => u.status === filters.status);
        }
        if (filters.search) {
          const query = filters.search.toLowerCase();
          users = users.filter(u => 
            u.name.toLowerCase().includes(query) || 
            u.email.toLowerCase().includes(query)
          );
        }
        resolve({
          users,
          totalCount: 12584
        });
      }, 500);
    });
  },

  getEpisodeReviewData: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: 'The Startup Grind #44 — Finding Product-Market Fit',
          host: 'Arjun Sharma',
          hostChannel: 'The Startup Grind',
          category: 'Business & entrepreneurship',
          duration: '51 min',
          submittedAt: 'May 9, 2026',
          fileInfo: 'MP3 · 48.2 MB',
          description: "In this episode, we sit down with three founders who've cracked the code on product-market fit. What does it really feel like when you've found it — and how do you know when you've lost it? A deeply honest conversation about the moments that change everything.",
          hostStats: {
            totalEpisodes: 43,
            totalPlays: '62k',
            approved: 40,
            rejected: 1
          },
          otherEpisodes: [
            { id: 10, title: 'Fundraising 101 — Ep. 42', duration: '51 min', status: 'Approved' },
            { id: 11, title: 'Pitch Perfect — Ep. 41', duration: '44 min', status: 'Approved' },
            { id: 12, title: 'Building the MVP — Ep. 40', duration: '58 min', status: 'Approved' }
          ]
        });
      }, 500);
    });
  },

  updateEpisodeStatus: async (id, status, reason = '') => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1000);
    });
  },

  updateUserStatus: async (userId, status) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, status }), 800);
    });
  }
};
