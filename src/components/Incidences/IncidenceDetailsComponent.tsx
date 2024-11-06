import React, { useEffect, useState } from "react";
import {
  IncidenceStatus,
  incidenceStatusMap,
} from "../../enums/incidenceStatus";
import {
  IncidencePriority,
  incidencePriorityMap,
} from "../../enums/incidencePriority";
import Skeleton from "react-loading-skeleton";
import { getPriorityBadgeClass } from "../../utils/getPriorityBadgeClass";
import eventEmitter from "../../utils/eventEmitter";
import { UpdateIncidenceStatus } from "../../interfaces/incidences/UpdateIncidenceStatus";
import { getStatusBadgeClass } from "../../utils/getStatusBadgeClass";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../enums/userRole";
import { IncidenceFeedback } from "../../interfaces/incidences/IncidenceFeedback";

interface IncidenceDetails {
  priority: IncidencePriority;
  status: IncidenceStatus;
  assignedTo: string;
  createdBy: number;
  createdByName: string;
  createdAt: string;
}

interface IncidenceDetailsProps {
  dataIncidence: IncidenceDetails | null;
  completedIncidence: boolean;
  errorIncidence: string | null;
  handleStatusChange: (newStatus: IncidenceStatus) => void;
  handlePriorityChange: (newPriority: IncidencePriority) => void;
  technicians: UsersTableRow[] | null;
  completedTechnicians: boolean;
  errorTechnicians: string | null;
  handleNewTechnician: (
    newTechnicianId: number,
    newTechnicianName: string
  ) => void;
  handleValorar: () => void;
  incidenceFeedback: IncidenceFeedback | null;
  completedFeedback: boolean;
  errorFeedback: string | null;
}

const IncidenceDetailsComponent: React.FC<IncidenceDetailsProps> = ({
  dataIncidence,
  completedIncidence,
  errorIncidence,
  handleStatusChange,
  handlePriorityChange,
  technicians,
  completedTechnicians,
  errorTechnicians,
  handleNewTechnician,
  handleValorar,
  incidenceFeedback,
  completedFeedback,
  errorFeedback,
}) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<IncidenceStatus | null>(null);
  const [priority, setPriority] = useState<IncidencePriority | null>(null);
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<IncidenceFeedback | null>(null);

  /**
   * Effect to listen for events to update status, priority, assigned technician, and feedback.
   */
  useEffect(() => {
    eventEmitter.on(
      "statusUpdated",
      (eventPayload: {
        changedAt: string;
        changedBy: number;
        changedByUserName: string;
        resolutionDetails: string;
        status: IncidenceStatus;
      }) => {
        setStatus(eventPayload.status);
      }
    );

    eventEmitter.on("priorityUpdated", (newPriority: IncidencePriority) => {
      setPriority(newPriority);
    });

    eventEmitter.on("technicianUpdated", (newTechnician: string) => {
      setAssignedTo(newTechnician);
    });

    eventEmitter.on("feedbackAdded", (eventPayload: IncidenceFeedback) => {
      setFeedback(eventPayload);
    });

    return () => {
      eventEmitter.removeAllListeners("statusUpdated");
      eventEmitter.removeAllListeners("priorityUpdated");
      eventEmitter.removeAllListeners("technicianUpdated");
      eventEmitter.removeAllListeners("feedbackAdded");
    };
  }, []);

  /**
   * Effect to initialize incident details once data is loaded and error-free.
   */
  useEffect(() => {
    if (completedIncidence && !errorIncidence) {
      setStatus(dataIncidence!.status);
      setPriority(dataIncidence!.priority);
      setAssignedTo(dataIncidence!.assignedTo);
    }
  }, [completedIncidence, errorIncidence]);

  /**
   * Effect to initialize feedback once data is loaded and error-free.
   */
  useEffect(() => {
    if (completedFeedback && !errorFeedback) {
      setFeedback(incidenceFeedback!);
    }
  }, [completedFeedback, errorFeedback]);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col">
              <strong>Asignado a:</strong>
            </div>
            <div className="col position-relative">
              {!completedIncidence ||
              errorIncidence ||
              !completedTechnicians ||
              errorTechnicians ? (
                <Skeleton width={40} />
              ) : (
                <>
                  {user && user && user.role === UserRole.Administrator ? (
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {assignedTo}
                      </button>
                      <ul className="dropdown-menu">
                        {technicians!.map((user, index) => {
                          return (
                            assignedTo !== user.name && (
                              <li key={user.id}>
                                <button
                                  className="btn dropdown-item"
                                  onClick={() =>
                                    handleNewTechnician(user.id, user.name)
                                  }
                                >
                                  {user.name}
                                </button>
                              </li>
                            )
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <span>{assignedTo}</span>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <strong>Estado:</strong>
            </div>
            <div className="col position-relative">
              {!completedIncidence || errorIncidence ? (
                <Skeleton width={40} />
              ) : (
                <>
                  {user && user && user.role >= UserRole.Technician ? (
                    <div className="dropdown">
                      <button
                        className={`btn dropdown-toggle badge me-2 ${getStatusBadgeClass(
                          status!
                        )}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {incidenceStatusMap.get(status!)}
                      </button>
                      <ul className="dropdown-menu">
                        {[...incidenceStatusMap].map(
                          ([iteratedStatus, label], index) => {
                            return (
                              status !== iteratedStatus && (
                                <li key={iteratedStatus}>
                                  <button
                                    className="btn dropdown-item"
                                    onClick={() =>
                                      handleStatusChange(iteratedStatus)
                                    }
                                  >
                                    {label}
                                  </button>
                                </li>
                              )
                            );
                          }
                        )}
                      </ul>
                    </div>
                  ) : (
                    <span
                      className={`badge me-2 ${getStatusBadgeClass(status!)}`}
                    >
                      {incidenceStatusMap.get(status!)}
                    </span>
                  )}
                  {user!.id === dataIncidence!.createdBy &&
                    status === IncidenceStatus.Review &&
                    !feedback && (
                      <button
                        className="btn btn-dark btn-sm mt-2"
                        type="button"
                        onClick={handleValorar}
                      >
                        Valorar resolución
                      </button>
                    )}
                  {feedback && (
                    <div className="d-flex flex-column mt-2">
                      <span>{feedback.feedback}</span>
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <label
                            key={i}
                            htmlFor={`star-${i}`}
                            className="star"
                            style={{
                              color: feedback.rating-1 >= i ? "#FFD700" : "#ccc",
                            }}
                          >
                            ★
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <strong>Prioridad:</strong>
            </div>
            <div className="col position-relative">
              {!completedIncidence || errorIncidence ? (
                <Skeleton width={40} />
              ) : (
                <>
                  {user && user && user.role >= UserRole.Technician ? (
                    <div className="dropdown">
                      <button
                        className={`btn dropdown-toggle badge me-2 ${getPriorityBadgeClass(
                          priority!
                        )}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {incidencePriorityMap.get(priority!)}
                      </button>
                      <ul className="dropdown-menu">
                        {[...incidencePriorityMap].map(
                          ([iteratedPriority, label], index) => {
                            return (
                              priority !== iteratedPriority && (
                                <li key={iteratedPriority}>
                                  <button
                                    className="btn dropdown-item"
                                    onClick={() =>
                                      handlePriorityChange(iteratedPriority)
                                    }
                                  >
                                    {label}
                                  </button>
                                </li>
                              )
                            );
                          }
                        )}
                      </ul>
                    </div>
                  ) : (
                    <span
                      className={`badge me-2 ${getPriorityBadgeClass(
                        priority!
                      )}`}
                    >
                      {incidencePriorityMap.get(priority!)}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <strong>Informador:</strong>
            </div>
            <div className="col">
              {!completedIncidence || errorIncidence ? (
                <Skeleton width={80} />
              ) : (
                dataIncidence!.createdByName
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 pt-3">
        <span>
          Creado:{" "}
          {!completedIncidence || errorIncidence ? (
            <Skeleton width={80} />
          ) : (
            dataIncidence!.createdAt
          )}
        </span>
      </div>
    </div>
  );
};

export default IncidenceDetailsComponent;
