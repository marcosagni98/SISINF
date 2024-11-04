import React, { useEffect, useState } from "react";
import { IncidenceHistory } from "../../interfaces/incidences/IncidenceHistory";
import { getStatusBadgeClass } from "../../utils/getStatusBadgeClass";
import { incidenceStatusMap } from "../../enums/incidenceStatus";
import Skeleton from "react-loading-skeleton";
import eventEmitter from "../../utils/eventEmitter";
import { UpdateIncidenceStatus } from "../../interfaces/incidences/UpdateIncidenceStatus";
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
    if (completed && !error) {
      setHistory(data!);

      eventEmitter.on(
        "statusUpdated",
        (newStatusPayload: {
          username: string;
          payload: UpdateIncidenceStatus;
        }) => {
          setHistory((prevHistory) => [
            ...prevHistory,
            {
              status: newStatusPayload.payload.statusId,
              changedAt: (new Date()).toUTCString(),
              changedBy: newStatusPayload.payload.changedBy,
              changedByUserName: newStatusPayload.username,
              resolutionDetails: newStatusPayload.payload.resolutionDetails,
            },
          ]);
        }
      );

      return () => {
        eventEmitter.removeAllListeners("statusUpdated");
      };
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
