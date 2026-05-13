import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playlistService } from '../../services/playlistService';
import { 
  setPlaylistItems, 
  selectFilteredPlaylist, 
  selectPlaylistItems,
  selectActiveCategory 
} from '../../features/playlist/playlistSlice';
import { 
  selectCurrentEpisode, 
  selectIsPlaying, 
  setCurrentEpisode,
  togglePlay as toggleReduxPlay 
} from '../../features/player/playerSlice';
import PlaylistFilters from '../../components/playlist/PlaylistFilters';
import './Playlist.css';

const Playlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const allEpisodes = useSelector(selectPlaylistItems);
  const filteredEpisodes = useSelector(selectFilteredPlaylist);
  const activeCategory = useSelector(selectActiveCategory);
  const currentEpisode = useSelector(selectCurrentEpisode);
  const isPlaying = useSelector(selectIsPlaying);
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCount: 0, totalDuration: '' });

  // Icons (as SVGs to match the premium theme)
  const icons = {
    sort: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-3 3-3-3"/><path d="M12 3v18"/><path d="m9 6 3-3 3 3"/></svg>,
    trash: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
    play: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    mic: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    brain: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A5 5 0 0 1 12 7.3V9a3 3 0 0 1 3 3v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a3 3 0 0 1 3-3V7.3A5 5 0 0 1 9.5 2Z"/><path d="M14.5 2A5 5 0 0 0 12 7.3V9a3 3 0 0 0-3 3v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a3 3 0 0 0-3-3V7.3A5 5 0 0 0 14.5 2Z"/></svg>,
    music: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    business: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    comedy: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18ZM9 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM15 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8 14.5c.5 1 1.5 1.5 4 1.5s3.5-.5 4-1.5"/></svg>
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    setLoading(true);
    try {
      const response = await playlistService.getUserPlaylist();
      dispatch(setPlaylistItems(response.data));
      setStats({
        totalCount: response.totalCount,
        totalDuration: response.totalDuration
      });
    } catch (error) {
      console.error("Failed to fetch playlist", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await playlistService.removeFromPlaylist(id);
      const updatedList = allEpisodes.filter(ep => ep.id !== id);
      dispatch(setPlaylistItems(updatedList));
      setStats(prev => ({ ...prev, totalCount: prev.totalCount - 1 }));
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const getArtIcon = (category) => {
    switch (category) {
      case 'True Crime': return icons.mic;
      case 'Self-improvement': return icons.brain;
      case 'Music': return icons.music;
      case 'Business': return icons.business;
      case 'Comedy': return icons.comedy;
      default: return icons.mic;
    }
  };

  if (loading) {
    return (
      <div className="playlist-loading">
        <div className="loader"></div>
        <p>Loading your playlist...</p>
      </div>
    );
  }

  return (
    <div className="playlist-page">
      <div className="page-head">
        <div>
          <div className="page-title">My Playlist</div>
          <div className="page-sub">
            Showing {filteredEpisodes.length} of {allEpisodes.length} episodes · {stats.totalDuration} total
          </div>
        </div>
      </div>

      <PlaylistFilters />

      <div className="playlist-list">
        {filteredEpisodes.map((ep, index) => (
          <div 
            key={ep.id} 
            className={`pl-item ${ep.id === currentEpisode?.id ? 'active' : ''}`}
          >
            <div className="pl-num">
              {ep.id === currentEpisode?.id ? (
                <i className="playing-icon">{icons.play}</i>
              ) : (
                index + 1
              )}
            </div>
            
            <div 
              className={`pl-art`} 
              style={{ backgroundColor: ep.artColor }}
              onClick={() => navigate(`/episode/${ep.id}`)}
            >
              <i style={{ color: ep.category === 'Music' ? '#FDFBD4' : '#C05800' }}>
                {getArtIcon(ep.category)}
              </i>
            </div>

            <div className="pl-info" onClick={() => navigate(`/episode/${ep.id}`)}>
              <div className="pl-title">{ep.title}</div>
              <div className="pl-host">{ep.host}</div>
              <div className="pl-cat">{ep.category}</div>
            </div>

            <div className="pl-meta">
              {ep.id === currentEpisode?.id && (
                <div className="currently-badge">Now playing</div>
              )}
              <div className="pl-dur">{ep.duration}</div>
              {ep.id !== currentEpisode?.id && (
                <div className="pl-plays">{ep.plays} plays</div>
              )}
              <div className="pl-btns">
                <button 
                  className="pl-remove" 
                  onClick={() => handleRemove(ep.id)}
                >
                  {icons.trash}
                </button>
                <button 
                  className="pl-play"
                  onClick={() => {
                    if (ep.id === currentEpisode?.id) {
                      dispatch(toggleReduxPlay());
                    } else {
                      dispatch(setCurrentEpisode({
                        id: ep.id,
                        title: ep.title,
                        host: ep.host,
                        audioUrl: ep.audioUrl || `https://${process.env.VITE_AWS_BUCKET_NAME || 'podcast-manager-balaji'}.s3.ap-southeast-2.amazonaws.com/${ep.audio_s3_key}`,
                        imageUrl: ep.imageUrl
                      }));
                    }
                  }}
                >
                  {ep.id === currentEpisode?.id && isPlaying ? 'Pause' : 'Play'}
                </button>
              </div>
            </div>
          </div>
        ))}

        {allEpisodes.length > 0 && filteredEpisodes.length === 0 && (
          <div className="playlist-empty">
            <p>No podcasts in the "{activeCategory}" category yet.</p>
          </div>
        )}

        {allEpisodes.length === 0 && (
          <div className="playlist-empty">
            <p>Your playlist is empty. Browse episodes to add them here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
