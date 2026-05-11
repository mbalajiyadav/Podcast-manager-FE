import React from 'react';
import ReactApexChart from "react-apexcharts";
import { categoryPlays } from "../../../mock/categoryPlays";

const CategoryPlaysBar = () => {
  const series = [{
    name: "Total plays",
    data: categoryPlays.map(d => d.plays)
  }];

  const options = {
    chart: {
      type: "bar",
      height: 260,
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, sans-serif'
    },
    colors: ["#C05800"],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: '58%',
        distributed: false
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '11px',
        colors: ['#FDFBD4']
      },
      formatter: (v) => v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v
    },
    xaxis: {
      categories: categoryPlays.map(d => d.category),
      labels: {
        style: {
          fontSize: '11px',
          colors: ['#71360099']
        },
        formatter: (v) => v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: ['#38240D']
        }
      }
    },
    grid: {
      borderColor: '#71360022',
      strokeDashArray: 4,
      yaxis: { lines: { show: false } }
    },
    tooltip: {
      y: {
        formatter: (v) => v.toLocaleString() + ' plays'
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      }
    }
  };

  return (
    <div className="chart-card full-width">
      <div className="chart-title">Plays by category</div>
      <div className="chart-sub">Total plays per content category — all time</div>
      <ReactApexChart options={options} series={series} type="bar" height={260} />
    </div>
  );
};

export default CategoryPlaysBar;
