import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ActiveIncidences } from "../../interfaces/statistics/ActiveIncidences";
import { IncidencePriority } from "../../enums/incidencePriority";
import { useNavigate } from "react-router-dom";

interface ActiveIncidencesProps {
  data: ActiveIncidences | null;
  completed: boolean;
  error: string | null;
}

const ActiveIncidencesComponent: React.FC<ActiveIncidencesProps> = ({
  data,
  completed,
  error,
}) => {
  const navigate = useNavigate();

  const handleClick = (priority: IncidencePriority) => {
    //console.log(`Clicked on ${priority}`);
    navigate(`/mis-incidencias?prioridad=${priority}`);
  };

  return (
    <div className="card p-3 bg-main">
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
