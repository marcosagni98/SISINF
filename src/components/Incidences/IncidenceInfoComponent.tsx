import React, { useEffect, useState } from "react";
import { IncidenceDetails } from "../../interfaces/incidences/IncidenceDetails";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const IncidenceInfoComponent: React.FC = () => {
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
    <div className="card">
      <div className="card-body">
        <div className="d-flex gap-2 align-items-start">
          <h4 className="fw-bold mb-3">{incidence.title}</h4>
          <button type="button" className="btn p-0 text-secondary">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
        <div className="d-flex gap-2 align-items-start">
          <p className="text-muted mb-4">{incidence.description}</p>
          <button type="button" className="btn p-0 text-secondary">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidenceInfoComponent;
