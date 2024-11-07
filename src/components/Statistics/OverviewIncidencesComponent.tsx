import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTicket, faWrench } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetchResumeIncidences from "../../hooks/statistics/useFetchResumeIncidences";

/**
 * OverviewIncidencesComponent Component
 *
 * This component displays an overview of incidences, showing the number of open,
 * closed, and unassigned incidences. It uses Font Awesome icons to represent each
 * type of incidence and fetches the data dynamically via the `useFetchResumeIncidences` hook.
 * The data is displayed inside a card with three columns, each representing a different category.
 *
 * @component
 * @returns {React.ReactElement} - A component that shows an overview of the number of
 * open, closed, and unassigned incidences with corresponding icons and counts.
 */

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
    <div className="card p-3">
      <h5>Resumen de incidencias</h5>
      <div className="d-flex justify-content-around px-5 py-4 gap-4 fw-bold">
        <div className="text-center bg-light p-4 rounded-3 col-4">
          <FontAwesomeIcon icon={faTicket} size="2x" />
          {dataResumeIncidences?.openedIncidences}
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
