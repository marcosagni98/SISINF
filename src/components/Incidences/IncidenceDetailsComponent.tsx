import React, { useEffect, useState } from "react";
import { IncidenceDetails } from "../../interfaces/incidences/IncidenceDetails";
import IncidenceChatComponent from "./IncidenceChatComponent";
import { useParams } from "react-router-dom";

const IncidenceDetailsComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 'id' será una cadena
  const incidenceId = parseInt(id || "0"); // Convertimos 'id' a número
  const [incidence, setIncidence] = useState<IncidenceDetails | null>(null);

  useEffect(() => {
    // Simula una llamada a una API para obtener los detalles de la incidencia
    //fetchIncidenceDetails(incidenceId).then((data) => setIncidence(data));
  }, [incidenceId]);
/*
  const fetchIncidenceDetails = async (
    id: number
  ): Promise<IncidenceDetails> => {
    // Datos de prueba
    return {
      id: id,
      title: "Problema con el servidor",
      description:
        "El servidor no responde desde esta mañana. Necesitamos una solución urgente.",
      priority: "Alta",
      status: "Abierto",
      createdAt: new Date("2023-10-01T09:00:00"),
      createdBy: "Juan Pérez",
      assignedTo: "María Gómez",
      workLogs: [
        {
          user: "María Gómez",
          minutes: 2,
          logDate: new Date("2023-10-01T11:00:00"),
        },
      ],
      messages: [
        {
          sender: "Juan Pérez",
          message: "¿Alguna actualización sobre el problema?",
          sentAt: new Date("2023-10-01T10:00:00"),
        },
      ],
      history: [
        {
          status: "Abierto",
          changedAt: new Date("2023-10-01T09:00:00"),
          changedBy: "Juan Pérez",
          resolutionDetails: "",
        },
      ],
    };
  };
*/
  if (!incidence) {
    return <div>Cargando incidencia...</div>;
  }

  return (
    <div>
      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          To Do
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col">
              <strong>Asignado a:</strong>
            </div>
            {/*<div className="col">{incidence.assignedTo}</div>*/}
          </div>
          <div className="row mb-3">
            <div className="col">
              <strong>Estado:</strong>
            </div>
            <div className="col">{incidence.status}</div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <strong>Informador:</strong>
            </div>
            {/*<div className="col">{incidence.createdBy}</div>*/}
          </div>
        </div>
      </div>
      <div className="px-3 pt-3">
        <span>Creado: {incidence.createdAt.toLocaleDateString()}</span>
        <br />
        <span>
          Última modificación: {incidence.createdAt.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default IncidenceDetailsComponent;
