/**
 * Mock Service for Episode Detail Data
 */

export const episodeService = {
  getEpisodeDetails: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: 'The Vanishing of Room 12',
          category: 'True Crime & Mystery',
          host: 'Priya Menon',
          hostAvatar: 'PM',
          plays: '8,241',
          duration: '38 min',
          date: 'Apr 22, 2026',
          description: 'A hotel room sealed from the inside. A guest who vanished without a trace. In this episode, Priya reconstructs the chilling events of March 1988, piecing together eyewitness accounts, police reports, and one never-before-heard recording that changes everything. What really happened in Room 12?',
          hostStats: {
            episodeCount: 24,
            totalPlays: '142k'
          }
        });
      }, 500);
    });
  },

  getMoreFromHost: async (hostId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 101, title: 'The Missing Heiress', duration: '42 min', host: 'Priya Menon' },
          { id: 102, title: 'Cold Case: Bombay 1974', duration: '56 min', host: 'Priya Menon' },
          { id: 103, title: 'The Forgotten Witness', duration: '33 min', host: 'Priya Menon' },
          { id: 104, title: 'Dead Letters', duration: '48 min', host: 'Priya Menon' }
        ]);
      }, 500);
    });
  },

  toggleFollowHost: async (hostId) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, following: true }), 300);
    });
  }
};
