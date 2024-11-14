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

/**
 * Component for displaying the history of status changes for an incidence.
 * Shows a list of updates with timestamps, user information, and resolution details.
 */
const IncidenceHistoryComponent: React.FC<IncidenceHistoryProps> = ({
  data,
  completed,
  error,
}) => {
  /** State to store the history of the incidence */
  const [history, setHistory] = useState<IncidenceHistory[]>([]);

  /**
   * Listens for updates to the status via the event emitter and adds them to the history.
   */
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

    /** Cleanup listener on component unmount */
    return () => {
      eventEmitter.removeAllListeners("statusUpdated");
    };
  }, []);

  /**
   * Updates the history state when new data is received.
   */
  useEffect(() => {
    if (completed && !error) {
      setHistory(data!);
    }
  }, [completed, error]);

  /**
   * Renders the history list or a loading skeleton if data is not yet available.
   */
  return (
    <div>
      <h5>Historial</h5>
      <div style={{ maxHeight: "200px", overflowY: "auto" }} className="card">
        <ul className="list-group list-group-striped">
          {!completed || error ? (
            // Show loading skeletons if data is still being fetched
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
                      {/* Display the timestamp of the status change */}
                      <span>{toLocalDate(iteratedHistory.changedAt)}</span>
                      <br />
                      {/* Display the user who made the change and the new status */}
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
                      {/* Display resolution details if available */}
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
                // Show a message if there are no history records
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
