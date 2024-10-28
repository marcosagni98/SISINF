// HeatMapChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const generateData = (count: number, range: { min: number; max: number }) => {
  return Array.from({ length: count }, () => ({
    x: `Metric${Math.floor(Math.random() * 100)}`, // Asigna un valor x único a cada punto
    y: Math.floor(Math.random() * (range.max - range.min + 1)) + range.min,
  }));
};

const IncidencesResolutionComponent: React.FC = () => {
  const series = [
    {
      name: 'Metric1',
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: 'Metric2',
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: 'Metric3',
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: 'Metric4',
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: 'Metric5',
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: 'Metric6',
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: 'Metric7',
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: 'Metric8',
      data: generateData(18, { min: 0, max: 90 }),
    },
    {
      name: 'Metric9',
      data: generateData(18, { min: 0, max: 90 }),
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#008FFB'],
    title: {
      text: 'HeatMap Chart (Single color)',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 20, color: '#eff0f1' },
            { from: 21, to: 40, color: '#d4e0f5' },
            { from: 41, to: 60, color: '#a8c6ff' },
            { from: 61, to: 80, color: '#529fff' },
            { from: 81, to: 100, color: '#005bbf' },
          ],
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="heatmap" height={350} />
      </div>
    </div>
  );
};

export default IncidencesResolutionComponent;
