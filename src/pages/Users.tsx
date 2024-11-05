import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/shared/Layout";
import useFetchUsers from "../hooks/users/useFetchUsers";
import { PaginationProps } from "../interfaces/shared/PaginationProps";
import PaginationComponent from "../components/shared/PaginationComponent";
import GenericTableComponent from "../components/shared/GenericTableComponent";
import { UserRole, userRoleMap } from "../enums/userRole";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { UsersTableRow } from "../interfaces/users/UsersTableRow";
import { Tooltip } from "react-tooltip";
import usePutUpdateUser from "../hooks/usePutUpdateUser";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../context/AuthContext";

const Users: React.FC = () => {
  const navigate = useNavigate();
  
  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    pageNumber: 1,
    pageSize: 10,
    search: "",
    orderBy: "id",
    orderDirection: "asc",
  });

  const {
    data: dataUsers,
    completed: completedUsers,
    error: errorUsers,
    fetch: fetchUsers,
  } = useFetchUsers();

  useEffect(() => {
    fetchUsers(paginationProps);
  }, [paginationProps]);

  const handlePageChange = (page: number) => {
    setPaginationProps((prev) => ({ ...prev, pageNumber: page }));
  };

  const handlePageSizeChange = (size: number) => {
    setPaginationProps((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }));
  };

  const handleSort = (column: string) => {
    setPaginationProps((prev) => ({
      ...prev,
      orderBy: column,
      orderDirection: prev.orderDirection === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = () => {
    setPaginationProps((prev) => ({
      ...prev,
      pageNumber: 1,
      search: prev.search,
    }));
    fetchUsers(paginationProps);
  };

  const { put: putUpdateUser } = usePutUpdateUser();

  const cambiarRol = (id: number, userType: UserRole) => {
    if(userType === UserRole.User){
      putUpdateUser(id, 1);
    }
    else if(userType === UserRole.Technician){
      putUpdateUser(id, 0);
    }
  }

  const headers = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Nombre", sortable: true },
    { key: "email", label: "Email", sortable: true },
    {
      key: "userType",
      label: "Rol",
      sortable: true,
      render: (role: UserRole) => <span>{userRoleMap.get(role)}</span>,
    },
    {
      key: "row",
      label: "Acciones",
      sortable: false,
      render: (row: UsersTableRow) =>
        row.userType === UserRole.User ? (
          <button
            className="btn"
            data-tooltip-id="action-tooltip"
            data-tooltip-content="Ascender"
            data-tooltip-place="right"
            onClick={() => cambiarRol(row.id, row.userType)}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        ) : row.userType === UserRole.Technician ? (
          <button
            className="btn"
            data-tooltip-id="action-tooltip"
            data-tooltip-content="Degradar"
            data-tooltip-place="right"
            onClick={() => cambiarRol(row.id, row.userType)}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        ) : null,
    },
  ];

  const totalPages = dataUsers?.totalCount
    ? Math.ceil(dataUsers.totalCount / paginationProps.pageSize)
    : 1;

  return (
    <Layout title="Configuracion usuarios">
      <div className="row">
        <div className="offset-9 col-md-3">
          <div className="d-flex my-3">
            <input
              type="text"
              className="form-control flex-fill w-50"
              placeholder="Buscar usuario"
              value={paginationProps.search}
              onChange={(e) =>
                setPaginationProps((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
            />
            <button
              type="button"
              className="btn btn-dark ms-2"
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
      <div className="row p-2">
        <GenericTableComponent
          headers={headers}
          data={dataUsers?.items || []}
          completed={completedUsers}
          error={errorUsers}
          onSort={handleSort}
          sortColumn={paginationProps.orderBy}
          sortDirection={paginationProps.orderDirection}
        />
        <PaginationComponent
          currentPage={paginationProps.pageNumber}
          totalPages={totalPages || 1}
          pageSize={paginationProps.pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
      <Tooltip id="action-tooltip" />
    </Layout>
  );
};

export default Users;
