import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchMonthlyIncidences from '../../hooks/statistics/useFetchMonthlyIncidences';

/**
 * TotalIncidencesComponent Component
 *
 * This component displays a bar chart representing the total number of incidents per month.
 * It uses the `recharts` library to render the data in an interactive chart and fetches the data dynamically
 * using the `useFetchMonthlyIncidences` hook. The chart is responsive, adapting to its container size.
 *
 * @component
 * @returns {React.ReactElement} - A component that shows a bar chart with the number of incidents
 * per month, using data fetched through the `useFetchMonthlyIncidences` hook.
 */

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

    // Transform data into the format required by the BarChart
    const chartData = Object.entries(dataMonthlyIncidences?.incidencesByMonth || {}).map(([month, incidences]) => ({
        name: month, 
        incidencias: incidences,
    }));

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
