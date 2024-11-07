import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ActiveIncidences } from "../../interfaces/statistics/ActiveIncidences";
import { IncidencePriority } from "../../enums/incidencePriority";
import { Navigate, useNavigate } from "react-router-dom";

interface ActiveIncidencesProps {
  data: ActiveIncidences | null;
  completed: boolean;
  error: string | null;
}

/**
 * ActiveIncidencesComponent Component
 *
 * This component displays the current active incidences data, with priority
 * breakdowns for high, medium, and low priority incidences. It includes loading
 * skeletons for the data while fetching, and displays an error message if there
 * is a loading error.
 *
 * @component
 * @param {ActiveIncidencesProps} props - Contains incidence data (`data`), a boolean
 * indicating if loading is complete (`completed`), and an error message (`error`) if
 * an issue occurred during data fetching.
 * @returns {React.ReactElement} - A card component showing active incidence stats,
 * with buttons to filter by priority.
 */
const ActiveIncidencesComponent: React.FC<ActiveIncidencesProps> = ({
  data,
  completed,
  error,
}) => {

  const navigate = useNavigate();
  
  /**
   * handleClick Function
   *
   * Navigates to a filtered view of incidences based on the selected priority.
   *
   * @param {IncidencePriority} priority - The priority level of incidences to filter.
   */
  const handleClick = (priority: IncidencePriority) => {
    //console.log(`Clicked on ${priority}`);
    navigate(`/mis-incidencias?prioridad=${priority}`);
  };


  return (
    <div className="card p-3">
      <h5>Incidencias activas</h5>
      <h2 className="fw-semibold">
        {!completed || error ? (
          <Skeleton height={30} width={50} />
        ) : (
          data!.total
        )}
      </h2>
      <div className="d-flex justify-content-between gap-2">
        {!completed || error ? (
          <>
            <div className="col-4 btn btn-md p-0">
              <Skeleton height={30} width="100%" />
            </div>
            <div className="col-4 btn btn-md p-0">
              <Skeleton height={30} width="100%" />
            </div>
            <div className="col-4 btn btn-md p-0">
              <Skeleton height={30} width="100%" />
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="col-4 btn btn-md badge-danger flex-fill"
              onClick={() => handleClick(2)}
            >
              {data!.high} altas
            </button>
            <button
              type="button"
              className="col-4 btn btn-md badge-warning flex-fill"
              onClick={() => handleClick(1)}
            >
              {data!.medium} medias
            </button>
            <button
              type="button"
              className="col-4 btn btn-md badge-success flex-fill"
              onClick={() => handleClick(0)}
            >
              {data!.low} bajas
            </button>
          </>
        )}
      </div>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ActiveIncidencesComponent;
