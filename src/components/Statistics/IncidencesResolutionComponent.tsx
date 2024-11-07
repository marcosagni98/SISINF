// HeatMapChart.tsx
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import useFetchIncidencesByDay from '../../hooks/statistics/useFetchIncidencesByDay';

const generateDatesOfYear = (year: number): string[] => {
  const dates = [];
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtener el número de días en el mes
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    }
  }
  return dates;
};

const IncidencesResolutionComponent: React.FC = () => {
  const [combinedData, setCombinedData] = useState<{ x: string; y: number }[]>([]);

  const {
    data: dataIncidencesByDay,
    completed: completedIncidencesByDay,
    error: errorIncidencesByDay,
    fetch: fetchIncidencesByDay
  } = useFetchIncidencesByDay();

  useEffect(() => {
    fetchIncidencesByDay();
}, []);

  console.log(dataIncidencesByDay);

  useEffect(() => {
    if (dataIncidencesByDay) {
      const incidentDays = new Set(dataIncidencesByDay.map((item) => item.date));
      const allDaysOfYear = generateDatesOfYear(new Date().getFullYear());

      // Crear el array de datos combinando días con y sin incidencias
      const data = allDaysOfYear.map(day => ({
        x: day,
        y: incidentDays.has(day) ? dataIncidencesByDay.find(item => item.date === day)?.count || 0 : 0, // Si hay incidencias, usar el conteo; si no, usar 0
      }));

      setCombinedData(data);
    }
  }, [dataIncidencesByDay]); // Se ejecuta cuando dataIncidencesByDay cambia

  const series = [
    {
      name: 'Incidencias por Día',
      data: combinedData,
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
            { from: 0, to: 2, color: '#eff0f1' },
            { from: 2, to: 100, color: '#005bbf' },
          ],
        },
      },
    },
  };

  return (
    <div className='bg-static rounded'>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="heatmap" height={350} />
      </div>
    </div>
  );
};

export default IncidencesResolutionComponent;