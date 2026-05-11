import React from 'react';
import ReactApexChart from "react-apexcharts";
import { episodeStatus } from "../../../mock/episodeStatus";

const EpisodeStatusDonut = () => {
  const series = [episodeStatus.approved, episodeStatus.pending, episodeStatus.rejected];
  const total = series.reduce((a, b) => a + b, 0);

  const options = {
    chart: {
      type: "donut",
      height: 220,
      background: 'transparent',
      fontFamily: 'Inter, sans-serif'
    },
    labels: ["Approved", "Pending", "Rejected"],
    colors: ["#C05800", "#713600", "#38240D"],
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      labels: {
        colors: ['#38240D', '#38240D', '#38240D']
      },
      markers: {
        width: 10,
        height: 10,
        radius: 3
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '11px',
              color: '#71360099',
              formatter: () => total.toLocaleString()
            },
            value: {
              fontSize: '22px',
              fontWeight: 700,
              color: '#38240D',
              formatter: (v) => Number(v).toLocaleString()
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: (v) => v.toLocaleString() + ' episodes'
      }
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-title">Episode queue health</div>
      <div className="chart-sub">Breakdown of all episodes by current status</div>
      <ReactApexChart options={options} series={series} type="donut" height={220} />
    </div>
  );
};

export default EpisodeStatusDonut;
