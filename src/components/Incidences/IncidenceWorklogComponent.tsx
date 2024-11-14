import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { IncidenceWorkLog } from "../../interfaces/incidences/IncidenceWorkLog";
import Skeleton from "react-loading-skeleton";
import eventEmitter from "../../utils/eventEmitter";
import { toLocalDate } from "../../utils/toLocalDate";

interface IncidenceWorklogProps {
  data: IncidenceWorkLog[] | null;
  completed: boolean;
  error: string | null;
  handleOpenModal: () => void;
}

/**
 * Component for displaying and managing the worklog of an incidence.
 * Shows a list of time entries and allows adding new worklogs.
 */
const IncidenceWorklogComponent: React.FC<IncidenceWorklogProps> = ({
  data,
  completed,
  error,
  handleOpenModal,
}) => {
  /** State to store the worklog entries */
  const [worklog, setWorklog] = useState<IncidenceWorkLog[]>([]);

  /**
   * Listens for new worklog entries via the event emitter.
   * Updates the worklog state when a new entry is added.
   */
  useEffect(() => {
    eventEmitter.on("worklogAdded", (eventPayload: {
      logDate: string;
      minWorked: number;
      technicianName: string;
    }) => {
      setWorklog((prevWorklog) => [
        ...prevWorklog,
        {
          logDate: eventPayload.logDate,
          minWorked: eventPayload.minWorked,
          technicianName: eventPayload.technicianName,
        },
      ]);
    });

    /** Cleanup listener on component unmount */
    return () => {
      eventEmitter.removeAllListeners("worklogAdded");
    };
  }, []);

  /**
   * Updates the worklog state when new data is received.
   */
  useEffect(() => {
    if (completed && !error) {
      setWorklog(data!);
    }
  }, [completed, error]);

  /** Calculates the total minutes worked from the worklog entries */
  const totalMinWorked = worklog.reduce((acc, log) => acc + log.minWorked, 0);

  /**
   * Renders the worklog list or a loading skeleton if data is not yet available.
   */
  return (
    <div className="d-flex flex-column">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Registro de tiempo {worklog.length > 0 && (<span>({totalMinWorked} min)</span>)}</h5>
        <button className="btn btn-dark" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Imputar
        </button>
      </div>

      {/* Worklog List Section */}
      <div style={{ maxHeight: "200px", overflowY: "auto" }} className="card">
        <ul className="list-group  list-group-striped">
          {!completed || error ? (
            // Show loading skeletons if data is still being fetched
            <>
              {[...Array(5)].map((_, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex">
                    <div className="col-4">
                      <h6 className="mb-1">
                        <Skeleton width={80} />
                      </h6>
                    </div>
                    <div className="col-4">
                      <p className="mb-1">
                        <Skeleton width={60} />
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        <Skeleton width={80} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <>
              {worklog!.length > 0 ? (
                [...worklog].reverse().map((log, index) => (
                  <li key={index} className="list-group-item">
                    <div className="d-flex">
                      {/* Technician's name */}
                      <div className="col-4">
                        <h6 className="mb-1">{log.technicianName}</h6>
                      </div>
                      {/* Minutes worked */}
                      <div className="col-4">
                        <p className="mb-1">Minutos: {log.minWorked}</p>
                      </div>
                      {/* Date of the worklog entry */}
                      <div className="col-4">
                        <p>{toLocalDate(log.logDate)}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                // Show a message if there are no worklog entries
                <p className="text-center text-muted mt-2">
                  Todavía no hay imputaciones de tiempo.
                </p>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default IncidenceWorklogComponent;
