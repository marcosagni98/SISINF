import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
    { name: 'Jan', incidencias: 1 },
    { name: 'Feb', incidencias: 2 },
    { name: 'Mar', incidencias: 0 },
    { name: 'Apr', incidencias: 4 },
    { name: 'May', incidencias: 5 },
    { name: 'Jun', incidencias: 3 },
];

const TotalIncidencesComponent: React.FC = () => {
    return (
        <div className="p-3 bg-static rounded">
            <h5>Total de incidencias</h5>
            <h2>32</h2>
            <p className="text-success">↑ 12% vs last year</p>
            <ResponsiveContainer width="95%" height={200}>
                <BarChart data={data}>
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
