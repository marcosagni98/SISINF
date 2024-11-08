import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchMonthlyIncidences from '../../hooks/statistics/useFetchMonthlyIncidences';

const TotalIncidencesComponent: React.FC = () => {
    const {
        data: dataMonthlyIncidences,
        completed: completedMonthlyIncidences,
        error: errorMonthlyIncidences,
        fetch: fetchMonthlyIncidences
    } = useFetchMonthlyIncidences();

    useEffect(() => {
        fetchMonthlyIncidences();
    }, []);

    // Transformar los datos para el BarChart
    const chartData = Object.entries(dataMonthlyIncidences?.incidencesByMonth || {}).map(([month, incidences]) => ({
        name: month, // Puedes cambiar esto por el nombre del mes si es necesario
        incidencias: incidences,
    }));

    console.log(chartData); // Para ver el resultado de la transformación

    return (
        <div className="p-3 bg-static rounded">
            <h5>Total de incidencias</h5>
            <ResponsiveContainer width="95%" height={200}>
                <BarChart data={chartData}> {/* Asegúrate de pasar los datos al BarChart */}
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="incidencias" barSize={100} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalIncidencesComponent;
