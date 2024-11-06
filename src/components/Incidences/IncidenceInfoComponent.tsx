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

/**
 * IncidenceInfoComponent
 *
 * This component displays the title and description of an incidence. It allows the title
 * and description to be edited through buttons. The component listens for changes in the title
 * and description through events and updates accordingly.
 *
 * @component
 * @returns {React.ReactElement} - The rendered component with title, description, and edit buttons.
 */
const IncidenceInfoComponent: React.FC<IncidenceInfoProps> = ({
  data,
  completed,
  error,
  handleEditTitle,
  handleEditDescription,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /**
   * useEffect to handle updates to title and description. Listens for events
   * 'titleUpdated' and 'descriptionUpdated', updating the component’s
   * title and description states when triggered.
   */
  useEffect(() => {
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
  }, [])
  
   /**
   * useEffect to initially set the title and description once data is fully loaded
   * and there are no errors. Updates title and description states with data values.
   */
  useEffect(() => {
    if (completed && !error) {
      setTitle(data!.title);
      setDescription(data!.desc);
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
