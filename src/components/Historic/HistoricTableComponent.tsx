import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { HistoricTableRow } from "../../interfaces/historic/HistoricTableRow";

interface HistoricTableComponentProps {
  data: HistoricTableRow[] | null;
  completed: boolean;
  error: string | null;
}

const HistoricTableHeaderComponent: React.FC = () => (
  <thead>
    <tr className="text-uppercase">
      <th className="fw-semibold bg-dark text-light">ID</th>
      <th className="fw-semibold bg-dark text-light">Título</th>
      <th className="fw-semibold bg-dark text-light">Resuelto por</th>
      <th className="fw-semibold bg-dark text-light">Acciones</th>
    </tr>
  </thead>
);

interface HistoricRowProps {
  row: HistoricTableRow;
}

const HistoricRowComponent: React.FC<HistoricRowProps> = ({ row }) => (
  <tr>
    <th scope="row">#{row.id}</th>
    <td>
      <span>{row.title}</span>
    </td>
    <td>
      <span>{row.resolvedBy}</span>
    </td>
    <td className="d-flex justify-content-end gap-2">
      <button type="button" className="btn p-0">
        <FontAwesomeIcon icon={faEye} />
      </button>
    </td>
  </tr>
);

const HistoricTableComponent: React.FC<HistoricTableComponentProps> = ({
  data,
  completed,
  error,
}) => {
  if (!completed || error) {
    return (
      <div className="table-responsive card">
        <table className="table table-borderless table-striped">
          <HistoricTableHeaderComponent />
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
                  <div className="d-flex justify-content-end gap-2">
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
        <HistoricTableHeaderComponent />
        <tbody>
          {data!.map((row) => (
            <HistoricRowComponent key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricTableComponent;
