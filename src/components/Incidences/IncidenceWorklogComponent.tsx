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

const IncidenceWorklogComponent: React.FC<IncidenceWorklogProps> = ({
  data,
  completed,
  error,
  handleOpenModal,
}) => {
  const [worklog, setWorklog] = useState<IncidenceWorkLog[]>([]);

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

    return () => {
      eventEmitter.removeAllListeners("worklogAdded");
    };
  }, []);

  useEffect(() => {
    if (completed && !error) {
      setWorklog(data!);
    }
  }, [completed, error]);

  const totalMinWorked = worklog.reduce((acc, log) => acc + log.minWorked, 0);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Registro de tiempo {worklog.length > 0 && (<span>({totalMinWorked} min)</span>)}</h5>
        <button className="btn btn-dark" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Imputar
        </button>
      </div>
      <div style={{ maxHeight: "200px", overflowY: "auto" }} className="card">
        <ul className="list-group  list-group-striped">
          {!completed || error ? (
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
                      <div className="col-4">
                        <h6 className="mb-1">{log.technicianName}</h6>
                      </div>
                      <div className="col-4">
                        <p className="mb-1">Minutos: {log.minWorked}</p>
                      </div>
                      <div className="col-4">
                        <p>{toLocalDate(log.logDate)}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
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
