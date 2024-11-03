import React, { useEffect, useState } from "react";
import { IncidenceDetails } from "../../interfaces/incidences/IncidenceDetails";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPencil } from "@fortawesome/free-solid-svg-icons";

const IncidenceHistoryComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 'id' será una cadena
  const incidenceId = parseInt(id || "0"); // Convertimos 'id' a número
  const [incidence, setIncidence] = useState<IncidenceDetails | null>(null);

  useEffect(() => {
    // Simula una llamada a una API para obtener los detalles de la incidencia
//    fetchIncidenceDetails(incidenceId).then((data) => setIncidence(data));
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
          status: "Finalizada",
          changedAt: new Date("2023-10-01T09:00:00"),
          changedBy: "Juan Pérez",
          resolutionDetails: "Sa acabao",
        },
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
      <h5>Historial</h5>
      <div style={{ maxHeight: "200px", overflowY: "auto" }} className="card">
        <ul className="list-group list-group-striped">
          {/*
          {incidence.history.length > 0 ? (
            incidence.history.map((history, index) => (
              <li key={index} className="list-group-item">
                <div>
                  <span>{history.changedAt.toLocaleDateString()}</span>
                  <br />
                  <span>
                    {history.changedBy} estableció el estado de la incidencia a{" "}
                    {history.status}
                  </span>
                  {history.resolutionDetails.trim() !== "" && (
                    <>
                      <br />
                      <span>Motivo: {history.resolutionDetails}</span>
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-muted">
              No hay worklogs disponibles.
            </p>
          )}
            */}
        </ul>
      </div>
    </div>
  );
};

export default IncidenceHistoryComponent;
