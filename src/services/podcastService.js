import axios from 'axios';
import { podcastsMock } from '../mock/podcastsMock';

const API_BASE_URL = 'https://api.podcastmanager.com/v1'; // TODO: Replace with real API URL when backend is ready

export const podcastService = {
  /**
   * Search for podcasts based on a query string.
   * Currently uses mock data but follows standard API patterns.
   */
  searchPodcasts: async (query, signal) => {
    // TODO: Replace with real API call when backend is ready
    // Example: const response = await axios.get(`${API_BASE_URL}/search?q=${query}`, { signal });
    // return response.data;

    // Simulate API delay (300-800ms)
    const delay = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Simulate network error for testing (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error. Please try again.');
    }

    if (!query) return [];

    // Filter mock data based on title, author, or category
    const searchResults = podcastsMock.filter(podcast => 
      podcast.title.toLowerCase().includes(query.toLowerCase()) ||
      podcast.author.toLowerCase().includes(query.toLowerCase()) ||
      podcast.category.toLowerCase().includes(query.toLowerCase())
    );

    return searchResults;
  },

  /**
   * Get podcast details by ID
   */
  getPodcastById: async (id) => {
    // TODO: Replace with real API call
    const delay = Math.floor(Math.random() * 300) + 200;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return podcastsMock.find(p => p.id === id) || null;
  }
};
