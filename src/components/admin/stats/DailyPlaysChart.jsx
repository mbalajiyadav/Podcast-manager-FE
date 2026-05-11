import React from 'react';
import ReactApexChart from "react-apexcharts";
import { dailyPlays } from "../../../mock/dailyPlays";

const DailyPlaysChart = () => {
  const series = [{
    name: "Plays",
    data: dailyPlays.map(d => d.plays)
  }];

  const options = {
    chart: {
      type: "area",
      height: 220,
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, sans-serif'
    },
    colors: ["#C05800"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.02,
        stops: [0, 100]
      }
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: dailyPlays.map(d => d.date),
      labels: {
        show: true,
        rotate: 0,
        style: {
          fontSize: '10px',
          colors: Array(30).fill('#71360099')
        },
        formatter: (value, timestamp, opts) => {
          // Show every 6th label to avoid crowding
          const idx = opts.i;
          return idx % 6 === 0 ? value.split('-').slice(1).join('/') : '';
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '10px',
          colors: ['#71360099']
        },
        formatter: (v) => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v
      }
    },
    grid: {
      borderColor: '#71360022',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (v) => v.toLocaleString() + ' plays'
      }
    },
    markers: { size: 0 }
  };

  return (
    <div className="chart-card">
      <div className="chart-title">Daily plays — last 30 days</div>
      <div className="chart-sub">Total episode plays per day across the platform</div>
      <ReactApexChart options={options} series={series} type="area" height={220} />
    </div>
  );
};

export default DailyPlaysChart;
