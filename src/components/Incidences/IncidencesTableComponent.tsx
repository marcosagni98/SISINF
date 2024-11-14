import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IncidencesTableRow } from "../../interfaces/incidences/IncidencesTableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMessage } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { incidencePriorityMap } from "../../enums/incidencePriority";

/**
 * Returns the corresponding badge class for each status type
 * @param status - The status of the incidence
 * @returns - The CSS class for the status badge
 */
function getStatusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case "en progreso":
      return "badge-warning text-dark";
    case "completado":
      return "badge-success";
    case "pendiente":
      return "badge-secondary";
    default:
      return "badge-light";
  }
}

/**
 * Returns the corresponding badge class for each priority type
 * @param priority - The priority of the incidence
 * @returns - The CSS class for the priority badge
 */
function getPriorityBadgeClass(priority: string): string {
  switch (priority.toLowerCase()) {
    case "alta":
      return "badge-danger";
    case "media":
      return "badge-warning text-dark";
    case "baja":
      return "badge-success";
    default:
      return "badge-light";
  }
}

interface IncidencesTableComponentProps {
  data: IncidencesTableRow[] | null;
  completed: boolean;
  error: string | null;
}

/**
 * IncidencesTableComponentHeader
 *
 * This component renders the header of the incidences table, with column names such as ID, Title,
 * Status, Priority, Assigned To, and Actions.
 *
 * @returns {React.ReactElement} - The header row for the incidences table.
 */
const IncidencesTableComponentHeader: React.FC = () => (
  <thead>
    <tr className="text-uppercase">
      <th className="fw-semibold bg-dark text-light">ID</th>
      <th className="fw-semibold bg-dark text-light">Título</th>
      <th className="fw-semibold bg-dark text-light">Estado</th>
      <th className="fw-semibold bg-dark text-light">Prioridad</th>
      <th className="fw-semibold bg-dark text-light">Asignado a</th>
      <th className="fw-semibold bg-dark text-light">Acciones</th>
    </tr>
  </thead>
);

interface IncidencesRowProps {
  row: IncidencesTableRow;
}

const IncidencesRowComponent: React.FC<IncidencesRowProps> = ({ row }) => (
  <tr>
    <th scope="row">#{row.id}</th>
    <td>
      <span>{row.title}</span>
    </td>
    <td>
      <span className={`badge ${getStatusBadgeClass(row.status.toString())}`}>
        {row.status}
      </span>
    </td>
    <td>
      <span className={`badge ${getPriorityBadgeClass(row.priority.toString())}`}>
        {incidencePriorityMap.get(row.priority)}
      </span>
    </td>
    <td>{row.assignedTo}</td>
    <td className="d-flex justify-content-end gap-2">
      <NavLink to={`/incidence/${row.id}`} className="btn p-0">
        <FontAwesomeIcon icon={faEye} />
      </NavLink>
      <button type="button" className="btn p-0">
        <FontAwesomeIcon icon={faMessage} />
      </button>
    </td>
  </tr>
);


const IncidencesTableComponent: React.FC<IncidencesTableComponentProps> = ({
  data,
  completed,
  error,
}) => {
  if (!completed || error) {
    return (
      <div className="table-responsive card">
        <table className="table table-borderless table-striped">
          <IncidencesTableComponentHeader />
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <th scope="row">
                  <Skeleton width={50} />
                </th>
                <td>
                  <Skeleton width={150} />
                </td>
                <td>
                  <Skeleton width={100} />
                </td>
                <td>
                  <Skeleton width={80} />
                </td>
                <td>
                  <Skeleton width={120} />
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton circle width={24} height={24} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-responsive card">
      <table className="table table-borderless table-striped">
        <IncidencesTableComponentHeader />
        <tbody>
          {data!.map((row) => (
            <IncidencesRowComponent key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidencesTableComponent;
