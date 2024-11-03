import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import useFetchHistoric from "../hooks/historic/useFetchHistoric";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import GenericTableComponent from "../components/shared/GenericTableComponent";
import { PaginationProps } from "../interfaces/shared/PaginationProps";
import PaginationComponent from "../components/shared/PaginationComponent";
import { User } from "../context/AuthContext";

const Historic: React.FC = () => {
  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    pageNumber: 1,
    pageSize: 10,
    search: "",
    orderBy: "id",
    orderDirection: "asc",
  });
  
  const {
    data: dataHistoric,
    completed: completedHistoric,
    error: errorHistoric,
    fetch: fetchHistoric,
  } = useFetchHistoric();

  
  useEffect(() => {
    fetchHistoric(paginationProps);
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

  const headers = [
    { key: "id", label: "ID", sortable: true },
    { key: "title", label: "Título", sortable: true },
    {
      key: "technicianId",
      label: "Resuelto por",
      sortable: true,
      render: (technicianId: number) => (
        <span>
          <span>{technicianId ? technicianId : "No asignado"}</span>
        </span>
      )
    },
    {
      key: "actions",
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
