import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import useFetchHistoric from "../hooks/historic/useFetchHistoric";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import GenericTableComponent from "../components/shared/GenericTableComponent";
import PaginationComponent from "../components/shared/PaginationComponent";
import { PaginationProps } from "../interfaces/shared/PaginationProps";
import { IncidenceStatus, incidenceStatusMap } from "../enums/incidenceStatus";
import { getStatusBadgeClass } from "../utils/getStatusBadgeClass";

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

  // Fetch data using custom hook for historic incidences
  const {
    data: dataHistoric,
    completed: completedHistoric,
    error: errorHistoric,
    fetch: fetchHistoric,
  } = useFetchHistoric();

  // Fetch data whenever pagination or sorting changes
  useEffect(() => {
    fetchHistoric(paginationProps);
  }, [paginationProps]);

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setPaginationProps((prev) => ({ ...prev, pageNumber: page }));
  };

  // Handle page size change for pagination
  const handlePageSizeChange = (size: number) => {
    setPaginationProps((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }));
  };

  // Handle sorting when a column is clicked
  const handleSort = (column: string) => {
    setPaginationProps((prev) => ({
      ...prev,
      orderBy: column,
      orderDirection: prev.orderDirection === "asc" ? "desc" : "asc",
    }));
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
        <div className="col-xl-12">
          {/* Optionally, include a search bar here if needed */}
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
