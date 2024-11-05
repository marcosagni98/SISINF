import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AverageIncidencesResolutionTime } from "../../interfaces/statistics/AverageIncidencesResolutionTime";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatInterval } from "../../utils/formatInterval";

interface AverageIncidencesResolutionTimeProps {
  data: AverageIncidencesResolutionTime | null;
  completed: boolean;
  error: string | null;
}

const AverageIncidencesResolutionTimeComponent: React.FC<
  AverageIncidencesResolutionTimeProps
> = ({ data, completed, error }) => {
  if (!completed || error) {
    return (
      <div className="card p-3 bg-card">
          <h5>Tiempo medio de resolución</h5>
          <h2 className="fw-semibold">
            <Skeleton width={220} height={36} />
          </h2>
          <p>
            <Skeleton width={200} height={20} />
          </p>
      </div>
    );
  }

  const isNegative = data!.changeRatioFromLastMonth < 0;
  const arrowIcon = isNegative ? faArrowUp : faArrowDown;
  const textClass = isNegative ? "text-danger" : "text-success";

  return (
    <div className="card p-3 bg-card">
      <h5>Tiempo medio de resolución</h5>
      <h2 className="fw-semibold">{formatInterval(data!.avgTimeMin)}</h2>
      <p className={textClass}>
        <FontAwesomeIcon icon={arrowIcon} />{" "}
        {Math.abs(data!.changeRatioFromLastMonth) * 100}% respecto al mes
        anterior
      </p>
    </div>
  );
};

export default AverageIncidencesResolutionTimeComponent;
