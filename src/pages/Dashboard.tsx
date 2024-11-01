import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
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

const Dashboard = () => {
  const { user } = useAuth();

  const {
    data: dataActiveIncidences,
    completed: completedActiveIncidences,
    error: errorActiveIncidences,
    fetch: fetchActiveIncidences,
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
    fetchRecentIncidences();
  }, []);

  return (
    <Layout title="Inicio">
      <div className="row">
        {user !== null && user.role >= UserRole.Technician &&
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
                className="form-control flex-fill"
                placeholder="Buscar incidencia"
              />
              <button type="button" className="btn btn-dark flex-fill">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-2">
          <IncidencesTableComponent data={dataRecentIncidences} completed={completedRecentIncidences} error={errorRecentIncidences} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
