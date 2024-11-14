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
 * Component for displaying and editing the title and description of an incidence.
 * Allows users to edit the title and description if they have the appropriate permissions.
 */
const IncidenceInfoComponent: React.FC<IncidenceInfoProps> = ({
  data,
  completed,
  error,
  handleEditTitle,
  handleEditDescription,
}) => {
  /** State to store the title of the incidence */
  const [title, setTitle] = useState("");
  /** State to store the description of the incidence */
  const [description, setDescription] = useState("");

  /**
   * Listens for updates to the title and description via the event emitter.
   * Updates the local state when changes occur.
   */
  useEffect(() => {
    eventEmitter.on("titleUpdated", (newTitle: string) => {
      setTitle(newTitle);
    });

    eventEmitter.on("descriptionUpdated", (newDescription: string) => {
      setDescription(newDescription);
    });

    /** Cleanup listeners on component unmount */
    return () => {
      eventEmitter.removeAllListeners("titleUpdated");
      eventEmitter.removeAllListeners("descriptionUpdated");
    };
  }, []);

  /**
   * Updates the title and description state when new data is received.
   */
  useEffect(() => {
    if (completed && !error) {
      setTitle(data!.title);
      setDescription(data!.desc);
    }
  }, [completed, error]);

  /**
   * Renders the component with editable fields for title and description.
   * Displays skeleton loaders while data is being fetched.
   */
  return (
    <div className="card">
      <div className="card-body">
        {/* Title Section */}
        <div className="d-flex position-relative align-items-start">
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

        {/* Description Section */}
        <div className="d-flex position-relative align-items-start">
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
