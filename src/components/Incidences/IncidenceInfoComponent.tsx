import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import eventEmitter from "../../utils/eventEmitter";

interface IncidenceInfo {
  title: string;
  desc: string;
}

interface IncidenceInfoProps {
  data: IncidenceInfo | null;
  completed: boolean;
  error: string | null;
  handleEditTitle: () => void;
  handleEditDescription: () => void;
}

const IncidenceInfoComponent: React.FC<IncidenceInfoProps> = ({
  data,
  completed,
  error,
  handleEditTitle,
  handleEditDescription,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (completed && !error) {
      setTitle(data!.title);
      setDescription(data!.desc);

      eventEmitter.on("titleUpdated", (newTitle: string) => {
        setTitle(newTitle);
      });

      eventEmitter.on("descriptionUpdated", (newDescription: string) => {
        setDescription(newDescription);
      });

      return () => {
        eventEmitter.removeAllListeners("titleUpdated");
        eventEmitter.removeAllListeners("descriptionUpdated");
      };
    }
  }, [completed, error]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex position-relative gap-2 align-items-start">
          <h4 className="fw-bold mb-3">
            {!completed || error ? <Skeleton height={30} width={100} /> : title}
          </h4>
          <button
            type="button"
            className="btn p-0 text-secondary edit-button"
            onClick={handleEditTitle}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
        <div className="d-flex position-relative gap-2 align-items-start">
          <p className="text-muted mb-4">
            {!completed || error ? (
              <Skeleton height={30} width={100} />
            ) : (
              description
            )}
          </p>
          <button
            type="button"
            className="btn p-0 text-secondary edit-button"
            onClick={handleEditDescription}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidenceInfoComponent;
