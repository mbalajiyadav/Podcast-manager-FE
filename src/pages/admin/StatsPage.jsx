import React, { useState } from 'react';
import MetricCards from '../../components/admin/stats/MetricCards';
import DailyPlaysChart from '../../components/admin/stats/DailyPlaysChart';
import EpisodeStatusDonut from '../../components/admin/stats/EpisodeStatusDonut';
import CategoryPlaysBar from '../../components/admin/stats/CategoryPlaysBar';
import './StatsPage.css';

const StatsPage = () => {
  const [range, setRange] = useState("30d");

  const filterButtons = [
    { label: '7d', value: '7d' },
    { label: '30d', value: '30d' },
    { label: '90d', value: '90d' },
    { label: 'All', value: 'all' }
  ];

  return (
    <div className="stats-page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Platform stats</h1>
          <p className="page-sub">Live overview of content, plays, and users</p>
        </div>
        <div className="date-filter">
          {filterButtons.map(btn => (
            <button 
              key={btn.value}
              className={`df-btn ${range === btn.value ? 'active' : ''}`}
              onClick={() => setRange(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <MetricCards />

      <div className="charts-top">
        <DailyPlaysChart range={range} />
        <EpisodeStatusDonut />
      </div>

      <div className="charts-bottom">
        <CategoryPlaysBar />
      </div>

      <div className="label-bar">Admin: Platform stats screen</div>
    </div>
  );
};

export default StatsPage;
