import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import useFetchMyIncidences from "../hooks/incidences/useFetchMyIncidences";
import PaginationComponent from "../components/shared/PaginationComponent";
import GenericTableComponent from "../components/shared/GenericTableComponent";
import { getPriorityBadgeClass } from "../utils/getPriorityBadgeClass";
import {
  IncidencePriority,
  incidencePriorityMap,
} from "../enums/incidencePriority";
import { IncidenceStatus, incidenceStatusMap } from "../enums/incidenceStatus";
import { getStatusBadgeClass } from "../utils/getStatusBadgeClass";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useSearchParams } from "react-router-dom";
import { PaginationProps } from "../interfaces/shared/PaginationProps";
import { Tooltip } from "react-tooltip";
import useFetchMyIncidencesPrioridad from "../hooks/incidences/useFetchMyIncidencesPrioridad";

interface MyIncidencesProps {
  prioridad?: IncidencePriority;
}

const MyIncidences: React.FC<MyIncidencesProps> = () => {
  const [searchParams] = useSearchParams();
  const prioridad = searchParams.get("prioridad") ? Number(searchParams.get("prioridad")) : null;

  // State to manage pagination and sorting
  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    pageNumber: 1,
    pageSize: 10,
    search: "",
    orderBy: "id",
    orderDirection: "asc",
  });
  const {
    data: dataMyIncidences,
    completed: completedMyIncidences,
    error: errorMyIncidences,
    fetch: fetchMyIncidences,
  } = useFetchMyIncidences();


  const {
    data: dataMyIncidencesPrioridad,
    completed: completedMyIncidencesPrioridad,
    error: errorMyIncidencesPrioridad,
    fetch: fetchMyIncidencesPrioridad,
  } = useFetchMyIncidencesPrioridad();

  // Fetch data on component mount and when pagination or priority changes
  useEffect(() => {
    if(prioridad == null){
      fetchMyIncidences(paginationProps);
    }
    else{
      fetchMyIncidencesPrioridad(paginationProps, prioridad);
    }
  }, [paginationProps, prioridad]);

  // Handle pagination changes
  const handlePageChange = (page: number) => {
    setPaginationProps((prev) => ({ ...prev, pageNumber: page }));
  };

  const handlePageSizeChange = (size: number) => {
    setPaginationProps((prev) => ({ ...prev, pageSize: size, pageNumber: 1 }));
  };

  // Handle sorting by column
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
    fetchMyIncidences(paginationProps);
  };

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
      key: "priority",
      label: "Prioridad",
      sortable: true,
      render: (priority: IncidencePriority) => (
        <span className={`badge ${getPriorityBadgeClass(priority)}`}>
          {incidencePriorityMap.get(priority)}
        </span>
      ),
    },
    { key: "assignedTo", label: "Asignado a", sortable: true },
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

  // Calculate total pages based on the fetched data
  const totalPages = (() => {
    const data = prioridad !== null ? dataMyIncidencesPrioridad : dataMyIncidences;
    return data && data.totalCount
      ? Math.ceil(data.totalCount / paginationProps.pageSize)
      : 1;
  })();

  return (
    <Layout title="Mis Incidencias">
      <div className="row">
        {/*<div className="offset-xl-9 col-xl-3">
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
        </div>*/}
      </div>
      <div className="row p-2">
        {/* Render the table of incidences */}
        <GenericTableComponent
          headers={headers}
          data={prioridad !== null ? dataMyIncidencesPrioridad?.items || [] : dataMyIncidences?.items || []}
          completed={prioridad !== null ? completedMyIncidencesPrioridad : completedMyIncidences}
          error={prioridad !== null ? errorMyIncidencesPrioridad : errorMyIncidences}
          onSort={handleSort}
          sortColumn={paginationProps.orderBy}
          sortDirection={paginationProps.orderDirection}
        />
        {/* Render pagination controls */}
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

export default MyIncidences;
