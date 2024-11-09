// OverviewIncidencias.tsx
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTicket, faWrench } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetchResumeIncidences from "../../hooks/statistics/useFetchResumeIncidences";

const OverviewIncidencesComponent: React.FC = () => {
  const {
    data: dataResumeIncidences,
    completed: completedResumeIncidences,
    error: errorResumeIncidences,
    fetch: getResumeIncidences,
  } = useFetchResumeIncidences();

  useEffect(() => {
    getResumeIncidences();
  }, []);

  return (
    <div className="p-3 bg-static rounded">
      <h5>Resumen de incidencias</h5>
      <div className="row justify-content-around px-5 py-4 fw-bold">
        <div className="col-lg-4 px-2">
          <div className="card text-center badge-info p-4 rounded-3">
            <FontAwesomeIcon icon={faTicket} size="2x" />
            {dataResumeIncidences?.openedIncidences}
            <p>Incidencias abiertas</p>
          </div>
        </div>
        <div className="col-lg-4 px-2 py-lg-0 py-2">
          <div className="card text-center badge-success p-4 rounded-3">
            <FontAwesomeIcon icon={faCheck} size="2x" />
            {dataResumeIncidences?.closedIncidences}
            <p>Incidencias cerradas</p>
          </div>
        </div>
        <div className="col-lg-4 px-2">
          <div className="card text-center badge-warning p-4 rounded-3">
            <FontAwesomeIcon icon={faWrench} size="2x" />
            {dataResumeIncidences?.unassignedIncidences}
            <p>Incidencias sin asignar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewIncidencesComponent;
