import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementPlayCount } from '../../features/playlist/playlistSlice';

const PlayerBar = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const hasCountedPlay = useRef(false);
  const totalListenedTime = useRef(0);
  const lastTimestamp = useRef(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Mock current podcast ID
  const currentPodcastId = '1'; 

  useEffect(() => {
    // Reset flags when podcast changes
    hasCountedPlay.current = false;
    totalListenedTime.current = 0;
    lastTimestamp.current = 0;
  }, [currentPodcastId]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    if (!hasCountedPlay.current) {
      const diff = time - lastTimestamp.current;

      // Only count if the time difference is small (e.g., < 1s) to avoid counting scrubs
      if (diff > 0 && diff < 1) {
        totalListenedTime.current += diff;
      }

      if (totalListenedTime.current >= 30) {
        hasCountedPlay.current = true;
        dispatch(incrementPlayCount(currentPodcastId));
        // TODO: call podcastService.recordPlay(currentPodcastId) when API is ready
        console.log(`Play counted for podcast ${currentPodcastId}`);
      }
    }

    lastTimestamp.current = time;
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const icons = {
    play: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    skipBack: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>,
    skipForward: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>,
    pause: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>,
    volume: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  };

  return (
    <div className="b-player-bar">
      <audio 
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Sample audio
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="pb-info">
        <div className="pb-title">The Vanishing of Room 12</div>
        <div className="pb-host">Priya Menon</div>
      </div>
      <div className="pb-progress">
        <div className="pb-bar">
          <div 
            className="pb-fill" 
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          ></div>
        </div>
        <div className="pb-times">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="pb-controls">
        <div className="pb-ctrl">{icons.skipBack}</div>
        <div className="pb-play" onClick={togglePlay}>
          {isPlaying ? icons.pause : icons.play}
        </div>
        <div className="pb-ctrl">{icons.skipForward}</div>
        <div className="pb-ctrl">{icons.volume}</div>
      </div>
    </div>
  );
};

export default PlayerBar;
