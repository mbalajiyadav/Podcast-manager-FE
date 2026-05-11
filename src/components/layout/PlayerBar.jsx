import React from 'react';

const PlayerBar = () => {
  const icons = {
    play: <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    skipBack: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>,
    skipForward: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>,
    pause: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>,
    volume: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  };

  return (
    <div className="b-player-bar">
      <div className="pb-info">
        <div className="pb-title">The Vanishing of Room 12</div>
        <div className="pb-host">Priya Menon</div>
      </div>
      <div className="pb-progress">
        <div className="pb-bar"><div className="pb-fill"></div></div>
        <div className="pb-times"><span>14:02</span><span>38:00</span></div>
      </div>
      <div className="pb-controls">
        <div className="pb-ctrl">{icons.skipBack}</div>
        <div className="pb-play">{icons.pause}</div>
        <div className="pb-ctrl">{icons.skipForward}</div>
        <div className="pb-ctrl">{icons.volume}</div>
      </div>
    </div>
  );
};

export default PlayerBar;
