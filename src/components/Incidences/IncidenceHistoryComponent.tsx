import React, { useEffect, useState } from "react";
import { IncidenceHistory } from "../../interfaces/incidences/IncidenceHistory";
import { getStatusBadgeClass } from "../../utils/getStatusBadgeClass";
import { IncidenceStatus, incidenceStatusMap } from "../../enums/incidenceStatus";
import Skeleton from "react-loading-skeleton";
import eventEmitter from "../../utils/eventEmitter";
import { toLocalDate } from "../../utils/toLocalDate";

interface IncidenceHistoryProps {
  data: IncidenceHistory[] | null;
  completed: boolean;
  error: string | null;
}

const IncidenceHistoryComponent: React.FC<IncidenceHistoryProps> = ({
  data,
  completed,
  error,
}) => {
  const [history, setHistory] = useState<IncidenceHistory[]>([]);

  useEffect(() => {
    eventEmitter.on(
      "statusUpdated",
      (eventPayload: {
        changedAt: string,
        changedBy: number,
        changedByUserName: string,
        resolutionDetails: string,
        status: IncidenceStatus,
      }) => {
        setHistory((prevHistory) => [
          ...prevHistory,
          {
            status: eventPayload.status,
            changedAt: eventPayload.changedAt,
            changedBy: eventPayload.changedBy,
            changedByUserName: eventPayload.changedByUserName,
            resolutionDetails: eventPayload.resolutionDetails,
          },
        ]);
      }
    );

    return () => {
      eventEmitter.removeAllListeners("statusUpdated");
    };
  }, []);

  useEffect(() => {
    if (completed && !error) {
      setHistory(data!);
    }
  }, [completed, error]);

  return (
    <div>
      <h5>Historial</h5>
      <div style={{ maxHeight: "200px", overflowY: "auto" }} className="card">
        <ul className="list-group list-group-striped">
          {!completed || error ? (
            <>
              {[...Array(5)].map((_, index) => (
                <li key={index} className="list-group-item">
                  <div>
                    <Skeleton width={80} />
                    <Skeleton width={300} />
                    <Skeleton width={300} />
                  </div>
                </li>
              ))}
            </>
          ) : (
            <>
              {history!.length > 0 ? (
                [...history].reverse().map((iteratedHistory, index) => (
                  <li key={index} className="list-group-item">
                    <div>
                      <span>{toLocalDate(iteratedHistory.changedAt)}</span>
                      <br />
                      <span>
                        {iteratedHistory.changedByUserName} estableció el estado
                        de la incidencia a{" "}
                        <span
                          className={`badge ${getStatusBadgeClass(
                            iteratedHistory.status
                          )}`}
                        >
                          {incidenceStatusMap.get(iteratedHistory.status)}
                        </span>
                      </span>
                      {iteratedHistory.resolutionDetails.trim() !== "" && (
                        <>
                          <br />
                          <span>
                            Motivo: {iteratedHistory.resolutionDetails}
                          </span>
                        </>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-muted mt-2">
                  Todavía no se han realizado acciones.
                </p>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default IncidenceHistoryComponent;
