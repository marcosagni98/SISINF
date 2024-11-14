import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchMonthlyIncidences from '../../hooks/statistics/useFetchMonthlyIncidences';

/**
 * Component to display the total number of incidences per month using a bar chart.
 * Fetches data from an API and visualizes it with `recharts`.
 */
const TotalIncidencesComponent: React.FC = () => {
  // Fetch monthly incidences data using a custom hook
  const {
    data: dataMonthlyIncidences,
    completed: completedMonthlyIncidences,
    error: errorMonthlyIncidences,
    fetch: fetchMonthlyIncidences
  } = useFetchMonthlyIncidences();

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchMonthlyIncidences();
  }, []);

    // Transformar los datos para el BarChart
  const chartData = Object.entries(dataMonthlyIncidences?.incidencesByMonth || {}).map(([month, incidences]) => ({
        name: month, // Puedes cambiar esto por el nombre del mes si es necesario
    incidencias: incidences,
  }));

  return (
    <div className="p-3 bg-static rounded">
      <h5>Total de incidencias</h5>
      {completedMonthlyIncidences && !errorMonthlyIncidences ? (
        <ResponsiveContainer width="95%" height={200}>
                <BarChart data={chartData}> {/* Asegúrate de pasar los datos al BarChart */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
                    <Bar dataKey="incidencias" barSize={100} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center mt-3">{errorMonthlyIncidences ? "Error al cargar los datos" : "Cargando..."}</p>
      )}
    </div>
  );
};

export default TotalIncidencesComponent;
