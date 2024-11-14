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
 * UserHappinessComponent Component
 *
 * This component displays the user's happiness ratio and the change in satisfaction from the previous month.
 * If the data is still loading or an error occurs, it shows a loading skeleton. 
 * Once the data is successfully fetched, it shows the user's happiness percentage 
 * and the change ratio from the last month, with an icon indicating if the change is positive or negative.
 *
 * @component
 * @param {UserHappinessProps} props - The component's props.
 * @returns {React.ReactElement} - A component that shows the user's happiness ratio and the change in satisfaction from the last month.
 */

const UserHappinessComponent: React.FC<UserHappinessProps> = ({
  data,
  completed,
  error,
}) => {
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

  const isNegative = data!.changeRatioFromLastMonth < 0;
  const arrowIcon = isNegative ? faArrowUp : faArrowDown;
  const textClass = isNegative ? "text-danger" : "text-success";

  return (
    <div className="card p-3 bg-main">
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
