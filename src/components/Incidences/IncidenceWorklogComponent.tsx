import React, { useEffect, useState } from "react";
import { IncidenceDetails } from "../../interfaces/incidences/IncidenceDetails";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEdit, faPencil } from "@fortawesome/free-solid-svg-icons";

const IncidenceWorklogComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 'id' será una cadena
  const incidenceId = parseInt(id || "0"); // Convertimos 'id' a número
  const [incidence, setIncidence] = useState<IncidenceDetails | null>(null);

  useEffect(() => {
    // Simula una llamada a una API para obtener los detalles de la incidencia
    fetchIncidenceDetails(incidenceId).then((data) => setIncidence(data));
  }, [incidenceId]);

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
        {
          user: "María Gómez",
          minutes: 2,
          logDate: new Date("2023-10-01T11:00:00"),
        },
        {
          user: "María Gómez",
          minutes: 2,
          logDate: new Date("2023-10-01T11:00:00"),
        },
        {
          user: "María Gómez",
          minutes: 2,
          logDate: new Date("2023-10-01T11:00:00"),
        },
        {
          user: "María Gómez",
          minutes: 2,
          logDate: new Date("2023-10-01T11:00:00"),
        },
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

  if (!incidence) {
    return <div>Cargando incidencia...</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Registro de tiempo</h5>
        <button className="btn btn-dark">Inputar <FontAwesomeIcon className="ms-1" icon={faClock}></FontAwesomeIcon></button>
      </div>
      <div style={{ maxHeight: "200px", overflowY: "auto" }} className="card">
        <ul className="list-group  list-group-striped">
          {incidence.workLogs.length > 0 ? (
            incidence.workLogs.map((log, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex">
                  <div className="col-6">
                    <h6 className="mb-1">{log.user}</h6>
                  </div>
                  <div className="col-3">
                    <p className="mb-1">Minutos: {log.minutes}</p>
                  </div>
                  <div className="col-3">
                    <p>{log.logDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-muted">No hay worklogs disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default IncidenceWorklogComponent;
