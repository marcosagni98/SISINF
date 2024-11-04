import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { IncidenceWorkLog } from "../../interfaces/incidences/IncidenceWorkLog";
import Skeleton from "react-loading-skeleton";
import TaskTimeModal from "./TaskTimeModal";

interface IncidenceWorklogProps {
  data: IncidenceWorkLog[] | null;
  completed: boolean;
  error: string | null;
}

const IncidenceWorklogComponent: React.FC<IncidenceWorklogProps> = ({
  data,
  completed,
  error,
}) => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Registro de tiempo</h5>
        <TaskTimeModal />
      </div>
      <div style={{ maxHeight: "200px", overflowY: "auto" }} className="card">
        <ul className="list-group  list-group-striped">
          {!completed || error ? (
            <>
              {[...Array(5)].map((_, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex">
                    <div className="col-6">
                      <h6 className="mb-1">
                        <Skeleton width={80} />
                      </h6>
                    </div>
                    <div className="col-3">
                      <p className="mb-1">
                        <Skeleton width={60} />
                      </p>
                    </div>
                    <div className="col-3">
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
              {data!.length > 0 ? (
                data!.map((log, index) => (
                  <li key={index} className="list-group-item">
                    <div className="d-flex">
                      <div className="col-6">
                        <h6 className="mb-1">{log.technicianName}</h6>
                      </div>
                      <div className="col-3">
                        <p className="mb-1">Minutos: {log.minWorked}</p>
                      </div>
                      <div className="col-3">
                        <p>{log.logDate.toLocaleDateString()}</p>
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
