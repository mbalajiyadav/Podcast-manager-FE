import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { episodeService } from '../../services/episodeService';
import { playlistService } from '../../services/playlistService';
import { useDispatch } from 'react-redux';
import { setCurrentEpisode } from '../../features/player/playerSlice';
import './EpisodeDetail.css';

const EpisodeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [moreFromHost, setMoreFromHost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const icons = {
    back: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
    mic: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    play: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    calendar: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
    pause: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>,
    skipBack: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>,
    skipForward: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>,
    rewind10: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14l-4-4 4-4"/><path d="M5 10a8 8 0 1 1 4.7 7.1"/><text x="12" y="14" fontSize="8" fontWeight="bold" fill="currentColor">10</text></svg>,
    forward10: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14l4-4-4-4"/><path d="M19 10a8 8 0 1 0-4.7 7.1"/><text x="12" y="14" fontSize="8" fontWeight="bold" fill="currentColor">10</text></svg>,
    volume: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
    bookmark: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>,
    share: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>,
    download: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const detailData = await episodeService.getEpisodeDetails(id);
        if (detailData) {
          console.log("AUDIO URL BEING USED:", detailData.audioUrl);
          setData(detailData);
          // Fetch more from the same channel
          if (detailData.channelId) {
             const moreData = await episodeService.getMoreFromHost(detailData.channelId);
             setMoreFromHost(moreData);
             setIsFollowing(detailData.isFollowing || false);
             setIsSaved(detailData.isSaved || false);
          }
        }
      } catch (error) {
        console.error("Error fetching episode data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFollow = async () => {
    if (!data.channelId) return;
    const result = await episodeService.toggleFollowHost(data.channelId);
    if (result.success) {
      setIsFollowing(result.isFollowing);
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await playlistService.removeFromPlaylist(id);
        setIsSaved(false);
      } else {
        await playlistService.addToPlaylist(id);
        setIsSaved(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update playlist');
    }
  };

  if (loading || !data) {
    return <div className="admin-loading">Loading episode details...</div>;
  }

  return (
    <div className="ep-detail-page">
      <div className="back-bar" onClick={() => navigate('/browse')}>
        <i>{icons.back}</i> Back to browse
      </div>

      <div className="ep-detail-content">
        <div className="ep-main">
          <div className="ep-header-section">
            <div className="ep-hero">
              <div className="ep-cover">
                {data.imageUrl ? (
                  <img src={data.imageUrl} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <i>{icons.mic}</i>
                )}
              </div>
              <div className="ep-hero-info">
                <div className="ep-cat">{data.category}</div>
                <h1 className="ep-main-title">{data.title || 'Untitled Episode'}</h1>
                <div className="ep-byline">
                  <div className="ep-host-avatar">{data.hostAvatar}</div>
                  <div className="ep-host-name">{data.host || 'Unknown Host'}</div>
                </div>
                <div className="ep-stats">
                  <div className="ep-stat"><i>{icons.play}</i> {data.plays} plays</div>
                  <div className="ep-stat"><i>{icons.clock}</i> {data.duration}</div>
                  <div className="ep-stat"><i>{icons.calendar}</i> {data.date}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="player-card">
             <button 
               className="main-play-btn" 
               style={{ 
                 width: '100%', 
                 padding: '16px', 
                 borderRadius: '12px', 
                 background: '#C05800', 
                 color: 'white', 
                 border: 'none', 
                 fontSize: '18px', 
                 fontWeight: 'bold',
                 cursor: 'pointer',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '12px'
               }}
               onClick={() => {
                 dispatch(setCurrentEpisode({
                   id: id,
                   title: data.title,
                   host: data.host,
                   audioUrl: data.audioUrl,
                   imageUrl: data.imageUrl
                 }));
               }}
             >
               <i style={{ display: 'flex' }}>{icons.play}</i> Play Episode
             </button>
          </div>

          <div className="ep-actions">
            <button 
              className={`action-btn ${isSaved ? 'active' : 'primary'}`} 
              onClick={handleSave}
            >
              <i>{icons.bookmark}</i> {isSaved ? 'Saved' : 'Save to playlist'}
            </button>
            <button className="action-btn"><i>{icons.share}</i> Share</button>
            <button className="action-btn"><i>{icons.download}</i> Download</button>
          </div>

          <h3 className="ep-desc-title">About this episode</h3>
          <p className="ep-desc">{data.description}</p>
        </div>

        <div className="ep-sidebar">
          <div className="host-card">
            <div className="host-ava">{data.hostAvatar}</div>
            <div className="host-name">{data.host}</div>
            <div className="host-ep-count">
              {data.hostStats.episodeCount} episodes · {data.hostStats.totalPlays} plays
            </div>
            <button 
              className={`follow-btn ${isFollowing ? 'following' : ''}`} 
              onClick={handleFollow}
            >
              {isFollowing ? 'Following' : 'Follow channel'}
            </button>
          </div>

          <h3 className="more-title">More from this host</h3>
          <div className="more-list">
            {moreFromHost.map(ep => (
              <div key={ep.id} className="more-item" onClick={() => navigate(`/episode/${ep.id}`)}>
                <div className="more-art"><i>{icons.mic}</i></div>
                <div className="more-info">
                  <div className="more-title-t">{ep.title}</div>
                  <div className="more-host">{ep.host} · {ep.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;
