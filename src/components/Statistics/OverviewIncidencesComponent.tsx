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


  useEffect(() =>{
    getResumeIncidences();
  }, [])


  return (
    <div className="p-3 bg-static rounded">
      <h5>Resumen de incidencias</h5>
      <div className="d-flex justify-content-around px-5 py-4 gap-4 fw-bold">
        <div className="text-center bg-info p-4 rounded-3 col-4">
          <FontAwesomeIcon icon={faTicket} size="2x" />
          {dataResumeIncidences?.openIncidences}
          <p>Incidencias abiertas</p>
        </div>
        <div className="text-center bg-success p-4 rounded-3 col-4">
          <FontAwesomeIcon icon={faCheck} size="2x" />
          {dataResumeIncidences?.closedIncidences}
          <p>Incidencias cerradas</p>
        </div>
        <div className="text-center bg-warning p-4 rounded-3 col-4">
          <FontAwesomeIcon icon={faWrench} size="2x" />
          {dataResumeIncidences?.unassignedIncidences}
          <p>Incidencias sin asignar</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewIncidencesComponent;
