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

/**
 * AverageIncidencesResolutionTimeComponent Component
 *
 * This component displays the average time taken to resolve incidences,
 * as well as the percentage change from the previous month. A loading
 * skeleton is shown while the data is being fetched, and an error message
 * is displayed if there is an issue.
 *
 * @component
 * @param {AverageIncidencesResolutionTimeProps} props - Contains the average
 * resolution time data (`data`), a boolean indicating if loading is complete (`completed`),
 * and an error message (`error`) if an issue occurred during data fetching.
 * @returns {React.ReactElement} - A card component showing average incidence resolution time
 * and the change in resolution time compared to the previous month.
 */

const AverageIncidencesResolutionTimeComponent: React.FC<
  AverageIncidencesResolutionTimeProps
> = ({ data, completed, error }) => {
  if (!completed || error) {
    return (
      <div className="card p-3">
        <>
          <h5>Tiempo medio de resolución</h5>
          <h2 className="fw-semibold">
            <Skeleton width={220} height={36} />
          </h2>
          <p>
            <Skeleton width={200} height={20} />
          </p>
        </>
      </div>
    );
  }

  const isNegative = data!.changeRatioFromLastMonth < 0;
  const arrowIcon = isNegative ? faArrowUp : faArrowDown;
  const textClass = isNegative ? "text-danger" : "text-success";

  return (
    <div className="card p-3">
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
