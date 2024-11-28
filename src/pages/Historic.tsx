import React, { useEffect, useState, KeyboardEvent } from "react";
import Layout from "../components/shared/Layout";
import useFetchHistoric from "../hooks/historic/useFetchHistoric";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import GenericTableComponent from "../components/shared/GenericTableComponent";
import PaginationComponent from "../components/shared/PaginationComponent";
import { PaginationProps } from "../interfaces/shared/PaginationProps";
import { IncidenceStatus, incidenceStatusMap } from "../enums/incidenceStatus";
import { getStatusBadgeClass } from "../utils/getStatusBadgeClass";
import useFetchUsers from "../hooks/users/useFetchUsers";

/**
 * Historic page component that displays a list of historical incidences.
 * Allows users to sort, search, and paginate through the list.
 */
const Historic: React.FC = () => {
  // State to handle pagination and sorting
  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    pageNumber: 1,
    pageSize: 10,
    search: "",
    orderBy: "id",
    orderDirection: "asc",
  });

  // State to control when to fetch data
  const [shouldFetch, setShouldFetch] = useState(true);

  // Fetch data using custom hook for historic incidences
  const {
    data: dataHistoric,
    completed: completedHistoric,
    error: errorHistoric,
    fetch: fetchHistoric,
  } = useFetchHistoric();

  const {
    data: dataUsers,
    completed: completedUsers,
    error: errorUsers,
    fetch: fetchUsers,
  } = useFetchUsers();

  // Fetch data whenever pagination or sorting changes
  useEffect(() => {
    if (shouldFetch) {
    fetchHistoric(paginationProps);
    fetchUsers(paginationProps);
    }
    setShouldFetch(false);
  }, [shouldFetch, paginationProps]);

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setPaginationProps((prev) => ({ ...prev, pageNumber: page }));
    setShouldFetch(true);
  };

  // Handle page size change for pagination
  const handlePageSizeChange = (size: number) => {
    setPaginationProps((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }));
    setShouldFetch(true);
  };

  // Handle sorting when a column is clicked
  const handleSort = (column: string) => {
    setPaginationProps((prev) => ({
      ...prev,
      orderBy: column,
      orderDirection: prev.orderDirection === "asc" ? "desc" : "asc",
    }));
    setShouldFetch(true);
  };

  const handleSearch = () => {
    setPaginationProps((prev) => ({
      ...prev,
      pageNumber: 1,
    }));
    setShouldFetch(true);
  };

  const handleSearchKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Table headers configuration for the GenericTableComponent
  const headers = [
    { key: "id", label: "ID", sortable: true },
    { key: "title", label: "Título", sortable: true },
    {
      key: "status",
      label: "Estado",
      sortable: true,
      render: (status: IncidenceStatus) => (
        <span className={`badge ${getStatusBadgeClass(status)}`}>
          {incidenceStatusMap.get(status)}
        </span>
      ),
    },
    {
      key: "technicianName",
      label: "Resuelto por",
      sortable: true,
      render: (technicianName: number) => (
        <span>
          <span>{technicianName}</span>
        </span>
      )
    },
    {
      key: "id",
      label: "Acciones",
      sortable: false,
      render: (id: number) => (
        <NavLink
          to={`/incidence/${id}`}
          className="text-decoration-none icon-main"
          data-tooltip-id="action-tooltip"
          data-tooltip-content="Ver incidencia"
          data-tooltip-place="right"
        >
          <FontAwesomeIcon icon={faEye} />
        </NavLink>
      ),
    },
  ];

  // Calculate total pages for pagination
  const totalPages = dataHistoric?.totalCount
    ? Math.ceil(dataHistoric.totalCount / paginationProps.pageSize)
    : 1;

  return (
    <div>
      <Layout title="Historico de Incidencias">
      <div className="row">
        <div className="col-xl-3 offset-xl-9">
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
              onKeyPress={handleSearchKeyPress}
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

      {/* Table displaying the historical incidences */}
      <div className="p-2">
        <GenericTableComponent
          headers={headers}
          data={dataHistoric?.items || []}
          completed={completedHistoric}
          error={errorHistoric}
          onSort={handleSort}
          sortColumn={paginationProps.orderBy}
          sortDirection={paginationProps.orderDirection}
        />
        {/* Pagination controls */}
        <PaginationComponent
          currentPage={paginationProps.pageNumber}
            totalPages={totalPages || 1}
          pageSize={paginationProps.pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </Layout>
    </div>
  );
};

export default Historic;