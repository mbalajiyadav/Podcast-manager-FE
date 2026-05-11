import React from 'react';
import { statsOverview } from '../../../mock/statsOverview';

const MetricCards = () => {
  const cards = [
    {
      label: 'Total episodes',
      value: statsOverview.totalEpisodes.toLocaleString(),
      change: `+${statsOverview.trends.episodesThisMonth} this month`,
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
      type: 'up'
    },
    {
      label: 'Total plays',
      value: (statsOverview.totalPlays / 1000000).toFixed(2) + 'M',
      change: `+${statsOverview.trends.playsChangePercent}% vs last month`,
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
      type: 'up'
    },
    {
      label: 'Active hosts',
      value: statsOverview.totalHosts.toLocaleString(),
      change: `+${statsOverview.trends.hostsThisMonth} this month`,
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
      type: 'up'
    },
    {
      label: 'Listeners',
      value: statsOverview.totalListeners.toLocaleString(),
      change: `+${statsOverview.trends.listenersThisWeek} this week`,
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
      type: 'up'
    }
  ];

  return (
    <div className="metric-grid">
      {cards.map((card, idx) => (
        <div key={idx} className="metric-card">
          <div className="mc-label">
            <i>{card.icon}</i> {card.label}
          </div>
          <div className="mc-num">{card.value}</div>
          <div className={`mc-change ${card.type}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="7 7 17 7 17 17"/><line x1="7" y1="17" x2="17" y2="7"/></svg>
            {card.change}
          </div>
        </div>
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        .metric-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .metric-card {
          background: #fff;
          border: 1px solid rgba(113, 54, 0, 0.1);
          border-radius: 10px;
          padding: 16px 18px;
        }
        .mc-label {
          font-size: 11px;
          color: rgba(113, 54, 0, 0.5);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 600;
        }
        .mc-label i {
          color: #C05800;
          display: flex;
          align-items: center;
        }
        .mc-num {
          font-size: 26px;
          font-weight: 700;
          color: #38240D;
          margin-bottom: 3px;
        }
        .mc-change {
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
        }
        .mc-change.up {
          color: #1a7a3c;
        }
        @media (max-width: 900px) {
          .metric-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .metric-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default MetricCards;
