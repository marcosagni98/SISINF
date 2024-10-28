import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { UsersTableRow } from "../../interfaces/users/UsersTableRow";

interface UsersTableComponentProps {
  data: UsersTableRow[] | null;
  completed: boolean;
  error: string | null;
}

const UsersTableHeaderComponent: React.FC = () => (
  <thead>
    <tr className="text-uppercase">
      <th className="fw-semibold bg-dark text-light">ID</th>
      <th className="fw-semibold bg-dark text-light">Nombre</th>
      <th className="fw-semibold bg-dark text-light">Email</th>
      <th className="fw-semibold bg-dark text-light">Rol</th>
      <th className="fw-semibold bg-dark text-light text-center">Acciones</th>
    </tr>
  </thead>
);

interface UsersRowProps {
  row: UsersTableRow;
}

const UsersRowComponent: React.FC<UsersRowProps> = ({ row }) => (
  <tr>
    <th scope="row">#{row.id}</th>
    <td>
      <span>{row.name}</span>
    </td>
    <td>
      <span>{row.email}</span>
    </td>
    <td>
      <span>{row.role}</span>
    </td>
    <td className="d-flex justify-content-center gap-2">
      <button type="button" className="btn p-0">
        <FontAwesomeIcon icon={faEye} />
      </button>
    </td>
  </tr>
);

const UsersTableComponent: React.FC<UsersTableComponentProps> = ({
  data,
  completed,
  error,
}) => {
  if (!completed || error) {
    return (
      <div className="table-responsive card">
        <table className="table table-borderless table-striped">
          <UsersTableHeaderComponent />
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
                  <div className="d-flex justify-content-center gap-2">
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
        <UsersTableHeaderComponent />
        <tbody>
          {data!.map((row) => (
            <UsersRowComponent key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTableComponent;
