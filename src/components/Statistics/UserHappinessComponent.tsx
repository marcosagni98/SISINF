import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserHappiness } from "../../interfaces/statistics/UserHappiness";

interface UserHappinessProps {
  data: UserHappiness | null;
  completed: boolean;
  error: string | null;
}

/**
 * Component to display user satisfaction metrics.
 * Shows the current user happiness ratio and the change compared to the previous month.
 */
const UserHappinessComponent: React.FC<UserHappinessProps> = ({
  data,
  completed,
  error,
}) => {
  // Display loading skeletons if data is not yet loaded or if there's an error
  if (!completed || error) {
    return (
      <div className="card p-3 bg-main">
        <h5>Satisfacción del usuario</h5>
        <h2 className="fw-semibold">
          <Skeleton width={50} height={36} />
        </h2>
        <p>
          <Skeleton width={200} height={20} />
        </p>
      </div>
    );
  }

  /** Determine if the change ratio from last month is positive or negative */
  const isNegative = data!.changeRatioFromLastMonth < 0;
  const arrowIcon = isNegative ? faArrowUp : faArrowDown;
  const textClass = isNegative ? "text-danger" : "text-success";

  return (
    <div className="card p-3 bg-main">
      {/* Header for the user happiness section */}
      <h5>Satisfacción del usuario</h5>
      <h2 className="fw-semibold">{data!.happinessRatio * 100}%</h2>
      <p className={textClass}>
        <FontAwesomeIcon icon={arrowIcon} />{" "}
        {Math.abs(data!.changeRatioFromLastMonth) * 100}% respecto al mes
        anterior
      </p>
    </div>
  );
};

export default UserHappinessComponent;
