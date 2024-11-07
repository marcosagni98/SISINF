import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ActiveIncidencesComponent from "../components/Statistics/ActiveIncidencesComponent";
import AverageIncidencesResolutionTimeComponent from "../components/Statistics/AverageIncidencesResolutionTimeComponent";
import UserHappinessComponent from "../components/Statistics/UserHappinessComponent";
import Layout from "../components/shared/Layout";
import useFetchActiveIncidences from "../hooks/statistics/useFetchActiveIncidences";
import useFetchAverageIncidencesResolutionTime from "../hooks/statistics/useFetchAverageIncidencesResolutionTime";
import useFetchUserHappiness from "../hooks/statistics/useFetchUserHappiness";
import IncidencesTableComponent from "../components/Incidences/IncidencesTableComponent";
import useFetchRecentIncidences from "../hooks/incidences/useFetchRecentIncidences";
import { useAuth } from "../hooks/useAuth";
import { UserRole } from "../enums/userRole";
import GenericTableComponent from "../components/shared/GenericTableComponent";
import { IncidenceStatus, incidenceStatusMap } from "../enums/incidenceStatus";
import { getStatusBadgeClass } from "../utils/getStatusBadgeClass";
import { IncidencePriority, incidencePriorityMap } from "../enums/incidencePriority";
import { getPriorityBadgeClass } from "../utils/getPriorityBadgeClass";
import { NavLink } from "react-router-dom";
import { PaginationProps } from "../interfaces/shared/PaginationProps";
import { Tooltip } from "react-tooltip";

const Dashboard = () => {
  const { user } = useAuth();

  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    pageNumber: 1,
    pageSize: 10,
    search: "",
    orderBy: "id",
    orderDirection: "asc",
  });

  const {
    data: dataActiveIncidences,
    completed: completedActiveIncidences,
    error: errorActiveIncidences,
    fetch: fetchActiveIncidences
  } = useFetchActiveIncidences();

  const {
    data: dataAverageIncidencesResolutionTime,
    completed: completedAverageIncidencesResolutionTime,
    error: errorAverageIncidencesResolutionTimes,
    fetch: fetchAverageIncidencesResolutionTime,
  } = useFetchAverageIncidencesResolutionTime();

  const {
    data: dataUserHappiness,
    completed: completedUserHappiness,
    error: errorUserHappiness,
    fetch: fetchUserHappiness,
  } = useFetchUserHappiness();

  const {
    data: dataRecentIncidences,
    completed: completedRecentIncidences,
    error: errorRecentIncidences,
    fetch: fetchRecentIncidences,
  } = useFetchRecentIncidences();

  useEffect(() => {
    fetchActiveIncidences();
    fetchAverageIncidencesResolutionTime();
    fetchUserHappiness();
    fetchRecentIncidences(paginationProps);
  }, [paginationProps]);

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
    
  function handleSort(column: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Layout title="Inicio">
      <div className="row">
        {user && user!.role >= UserRole.Technician &&
          <>
            <div className="col-4 mb-4">
              <ActiveIncidencesComponent
                data={dataActiveIncidences}
                completed={completedActiveIncidences}
                error={errorActiveIncidences}
              />
            </div>

            <div className="col-4 mb-4">
              <AverageIncidencesResolutionTimeComponent
                data={dataAverageIncidencesResolutionTime}
                completed={completedAverageIncidencesResolutionTime}
                error={errorAverageIncidencesResolutionTimes}
              />
            </div>

            <div className="col-4 mb-4">
              <UserHappinessComponent
                data={dataUserHappiness}
                completed={completedUserHappiness}
                error={errorUserHappiness}
              />
            </div>
          </>
        }
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="d-flex my-3">
            <h4 className="col-9 fw-bold fs-4">Incidencias Recientes</h4>
            <div className="d-flex align-self-center gap-2 col-3">
              <input
                type="text"
                className="form-control flex-fill bg-input"
                placeholder="Buscar incidencia"
              />
              <button type="button" className="btn btn-light flex-fill">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-2">
        <GenericTableComponent
          headers={headers}
          data={dataRecentIncidences?.items || []}
          completed={completedRecentIncidences}
          error={errorRecentIncidences}
          onSort={handleSort}
          sortColumn={paginationProps.orderBy}
          sortDirection={paginationProps.orderDirection}
        />
        </div>
      </div>
      <Tooltip id="action-tooltip" />
    </Layout>
  );
};

export default Dashboard;
