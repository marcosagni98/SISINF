// GravedadDeIncidencias.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const data = [
  { name: "Críticas", value: 2, color: "#ff4d4d" },
  { name: "Medias", value: 4, color: "#ffd11a" },
  { name: "Bajas", value: 6, color: "#66ff66" },
];

const IncidencesSeverityComponent: React.FC = () => {
  return (
    <div className="p-3 card">
      <h5 className="fw-bold">Gravedad de las incidencias</h5>
      <div className="d-flex gap-5">
        <div className="col-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="80%"
                fill="#8884d8"
                paddingAngle={5}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-success text-center">
            <FontAwesomeIcon icon={faArrowDown} />{" "}
            12% respecto al mes anterior
          </p>
        </div>
        <div className="mt-3 col-6">
          {data.map((entry, index) => (
            <div
              key={index}
              className="d-flex flex-column justify-content-between"
            >
              <span style={{ color: entry.color }} className="fw-bold">
                {entry.name}
              </span>
              <span>
                <span className="fs-2">{entry.value}</span> incidencias
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidencesSeverityComponent;
