import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/shared/Layout";
import useFetchUsers from "../hooks/users/useFetchUsers";
import { PaginationProps } from "../interfaces/shared/PaginationProps";
import PaginationComponent from "../components/shared/PaginationComponent";
import GenericTableComponent from "../components/shared/GenericTableComponent";
import { UserRole, userRoleMap } from "../enums/userRole";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { UsersTableRow } from "../interfaces/users/UsersTableRow";
import { Tooltip } from "react-tooltip";
import usePutUpdateUserRole from "../hooks/users/usePutUpdateUserRole";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Pagination } from "../interfaces/shared/Paginated";

/**
 * Users page component for managing user roles.
 * Allows administrators to view, search, sort, and update user roles.
 */
const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Pagination<UsersTableRow> | null>(null);
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
  
  // Fetch data whenever pagination or sorting changes
  useEffect(() => {
    fetchUsers(paginationProps);
  }, [paginationProps]);

  useEffect(() => {
    if (dataUsers) {
      setUsers(dataUsers);
    }
  }, [dataUsers]);

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

  const { put: putUpdateUserRole } = usePutUpdateUserRole();

  // Handle role change for a specific user
  const cambiarRol = async (id: number, newType: UserRole) => {
    const { data, error } = await putUpdateUserRole(id, newType);

    if (data?.statusCode === 200) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Se ha cambiado el rol con éxito",
        showConfirmButton: false,
        timer: 1500,
      });

      setUsers((prevUsers) => {
        if (!prevUsers) return prevUsers;

        return {
          ...prevUsers,
          items: prevUsers.items.map((user) =>
            user.id === id ? { ...user, userType: newType } : user
          ),
          totalCount: prevUsers.totalCount,
        };
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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
            onClick={() => cambiarRol(row.id, UserRole.Technician)}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        ) : row.userType === UserRole.Technician ? (
          <>
            <button
              className="btn"
              data-tooltip-id="action-tooltip"
              data-tooltip-content="Degradar"
              data-tooltip-place="top"
              onClick={() => cambiarRol(row.id, UserRole.User)}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <button
              className="btn"
              data-tooltip-id="action-tooltip"
              data-tooltip-content="Ascender"
              data-tooltip-place="top"
              onClick={() => cambiarRol(row.id, UserRole.Administrator)}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </>
        ) : (
          row.userType === UserRole.Administrator &&
          row.id !== 1 && (
          <button
            className="btn"
            data-tooltip-id="action-tooltip"
            data-tooltip-content="Degradar"
            data-tooltip-place="right"
            onClick={() => cambiarRol(row.id, UserRole.Technician)}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          )
        ),
    },
  ];

  const totalPages = users?.totalCount
    ? Math.ceil(users.totalCount / paginationProps.pageSize)
    : 1;

  return (
    <Layout title="Configuracion usuarios">
      <div className="row">
        <div className="offset-xl-9 col-xl-3">
          <div className="d-flex my-3">
              <input
                type="text"
                className="form-control flex-fill w-50"
                placeholder="Buscar incidencia"
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
                className="btn button-main ms-2"
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
          data={users?.items || []}
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
      {/* Tooltip for action icons */}
      <Tooltip id="action-tooltip" />
    </Layout>
  );
};

export default Users;
