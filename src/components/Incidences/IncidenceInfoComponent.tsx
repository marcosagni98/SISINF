import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";

interface IncidenceInfo {
  title: string;
  desc: string;
}

interface IncidenceInfoProps {
  data: IncidenceInfo | null;
  completed: boolean;
  error: string | null;
}

const IncidenceInfoComponent: React.FC<IncidenceInfoProps> = ({
  data,
  completed,
  error,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex gap-2 align-items-start">
          <h4 className="fw-bold mb-3">
            {!completed || error ? <Skeleton height={30} width={100} /> : data!.title}
          </h4>
          <button type="button" className="btn p-0 text-secondary">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
        <div className="d-flex gap-2 align-items-start">
          <p className="text-muted mb-4">
            {!completed || error ? <Skeleton height={30} width={100} /> : data!.desc}
          </p>
          <button type="button" className="btn p-0 text-secondary">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidenceInfoComponent;
