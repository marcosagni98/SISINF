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
      <div className="d-flex justify-content-between text-dark">
        {!completed || error ? (
          <>
            <div className="col-4 px-2">
              <Skeleton height={30} width="100%" />
            </div>
            <div className="col-4 px-2">
              <Skeleton height={30} width="100%" />
            </div>
            <div className="col-4 px-2">
              <Skeleton height={30} width="100%" />
            </div>
          </>
        ) : (
          <>
            <div className="px-2 col-4">
              <button
                type="button"
                className="btn btn-md badge-danger w-100"
                onClick={() => handleClick(2)}
              >
                {data!.high} altas
              </button>
            </div>
            <div className="px-2 col-4">
              <button
                type="button"
                className="btn btn-md badge-warning w-100"
                onClick={() => handleClick(1)}
              >
                {data!.medium} medias
              </button>
            </div>
            <div className="px-2 col-4">
              <button
                type="button"
                className="btn btn-md badge-success w-100"
                onClick={() => handleClick(0)}
              >
                {data!.low} bajas
              </button>
            </div>
          </>
        )}
      </div>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ActiveIncidencesComponent;
