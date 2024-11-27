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
import useFetchUsers from "../hooks/users/useFetchUsers";

/**
 * Dashboard component displaying an overview of statistics and recent incidences.
 * Includes user-specific data based on roles (e.g., technicians, administrators).
 */
const Dashboard = () => {
  const { user } = useAuth();

  // Pagination and sorting state
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

  const {
    data: dataUsers,
    completed: completedUsers,
    error: errorUsers,
    fetch: fetchUsers,
  } = useFetchUsers();

  // Fetch data on component mount and when pagination changes
  useEffect(() => {
    fetchActiveIncidences();
    fetchAverageIncidencesResolutionTime();
    fetchUserHappiness();
    fetchRecentIncidences(paginationProps);
    fetchUsers(paginationProps);
  }, [paginationProps]);

  // Table headers for displaying recent incidences
  const headers = [
    { key: "id", label: "ID", sortable: false },
    { key: "title", label: "Título", sortable: false },
    {
      key: "status",
      label: "Estado",
      sortable: false,
      render: (status: IncidenceStatus) => (
        <span className={`badge ${getStatusBadgeClass(status)}`}>
          {incidenceStatusMap.get(status)}
        </span>
      ),
    },
    {
      key: "priority",
      label: "Prioridad",
      sortable: false,
      render: (priority: IncidencePriority) => (
        <span className={`badge ${getPriorityBadgeClass(priority)}`}>
          {incidencePriorityMap.get(priority)}
        </span>
      ),
    },
    { key: "technicianName", label: "Asignado a", sortable: false },
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

  // Function to handle sorting (to be implemented)
  function handleSort(column: string): void {
    throw new Error("Function not implemented.");
  }

  const handleSearch = () => {
    setPaginationProps((prev) => ({
      ...prev,
      pageNumber: 1,
      search: prev.search,
    }));
    fetchUsers(paginationProps);
  };

  return (
    <Layout title="Inicio">
      {/* Statistics overview for users with Technician role or higher */}
      <div className="row">
        {user && user!.role >= UserRole.Technician &&
          <>
            <div className="col-xl-4 mb-4">
              <ActiveIncidencesComponent
                data={dataActiveIncidences}
                completed={completedActiveIncidences}
                error={errorActiveIncidences}
              />
            </div>

            <div className="col-xl-4 mb-4">
              <AverageIncidencesResolutionTimeComponent
                data={dataAverageIncidencesResolutionTime}
                completed={completedAverageIncidencesResolutionTime}
                error={errorAverageIncidencesResolutionTimes}
              />
            </div>

            <div className="col-xl-4 mb-4">
              <UserHappinessComponent
                data={dataUserHappiness}
                completed={completedUserHappiness}
                error={errorUserHappiness}
              />
            </div>
          </>
        }
      </div>

      {/* Recent incidences table */}
      <div className="row">
        <div className="col-xl-12">
          <div className="row my-3">
            <h4 className="col-xl-9 fw-bold fs-4">Incidencias Recientes</h4>
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
      {/* Tooltip for actions */}
      <Tooltip id="action-tooltip" />
    </Layout>
  );
};

export default Dashboard;
