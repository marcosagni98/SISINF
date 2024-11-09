import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import useFetchHistoric from "../hooks/historic/useFetchHistoric";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import GenericTableComponent from "../components/shared/GenericTableComponent";
import { PaginationProps } from "../interfaces/shared/PaginationProps";
import PaginationComponent from "../components/shared/PaginationComponent";
import { IncidenceStatus, incidenceStatusMap } from "../enums/incidenceStatus";
import { getStatusBadgeClass } from "../utils/getStatusBadgeClass";

/**
 * Component for displaying the historic incidence data.
 * Renders the layout, table of historic incidences, and pagination controls.
 * @returns {JSX.Element} - The rendered Historic component with table and pagination.
 */

const Historic: React.FC = () => {

  // State for pagination properties, including page number, page size, search term, and sort order
  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    pageNumber: 1,
    pageSize: 10,
    search: "",
    orderBy: "id",
    orderDirection: "asc",
  });
  
  // Fetch function and state for handling historic incidence data
  const {
    data: dataHistoric,
    completed: completedHistoric,
    error: errorHistoric,
    fetch: fetchHistoric,
  } = useFetchHistoric();

  // Fetch historic incidence data on component mount or pagination property change
  useEffect(() => {
    fetchHistoric(paginationProps);
  }, [paginationProps]);


  /**
   * Handles page change event for pagination, updating the current page.
   * @param {number} page - The page number to set.
   */
  const handlePageChange = (page: number) => {
    setPaginationProps((prev) => ({ ...prev, pageNumber: page }));
  };

  /**
   * Handles change in page size for pagination, resetting to page 1.
   * @param {number} size - The number of items per page.
   */
  const handlePageSizeChange = (size: number) => {
    setPaginationProps((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }));
  };

  /**
   * Handles sorting of the table based on selected column.
   * Toggles between ascending and descending order.
   * @param {string} column - The column to sort by.
   */
  const handleSort = (column: string) => {
    setPaginationProps((prev) => ({
      ...prev,
      orderBy: column,
      orderDirection: prev.orderDirection === "asc" ? "desc" : "asc",
    }));
  };

  // Column headers configuration for the incidence table, including sortable columns and custom render functions
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
      key: "technicianId",
      label: "Resuelto por",
      sortable: true,
      render: (technicianId: number) => (
        <span>
          <span>{technicianId ?? "No asignado"}</span>
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
          className="text-decoration-none text-dark"
          data-tooltip-id="action-tooltip"
          data-tooltip-content="Ver incidencia"
          data-tooltip-place="right"
        >
          <FontAwesomeIcon icon={faEye} />
        </NavLink>
      ),
    },
  ];

  // Calculate total pages for pagination based on the total count and page size
  const totalPages = dataHistoric?.totalCount
  ? Math.ceil(dataHistoric.totalCount / paginationProps.pageSize)
  : 1;

  return (
    <div>
      <Layout title="Historico de Incidencias">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex my-3">
              <div className="d-flex align-self-center gap-2 offset-9 col-3">
                <input
                  type="text"
                  className="form-control flex-fill"
                  placeholder="Buscar incidencia"
                />
                <button type="button" className="btn btn-dark flex-fill">
                  Buscar
                </button>
              </div>
              {/* Boton de Añadir Usuario */}
            </div>
          </div>
        </div>
        {/* Tabla de Mis Incidencias */}
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
