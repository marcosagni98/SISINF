import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import useFetchIncidencesByDay from "../../hooks/statistics/useFetchIncidencesByDay";
import { Tooltip } from "react-tooltip";

const IncidencesResolutionComponent: React.FC = () => {
  const {
    data: dataIncidencesResolution,
    completed: completedIncidencesResolution,
    error: errorIncidencesResolution,
    fetch: getIncidencesResolution,
  } = useFetchIncidencesByDay();

  // Local state to store the year dynamically
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    getIncidencesResolution();
  }, []);

  // Update the year based on the first and last date from the API response
  useEffect(() => {
    if (dataIncidencesResolution && dataIncidencesResolution.length > 0) {
      const firstDate = dataIncidencesResolution[0].date;
      const lastDate =
        dataIncidencesResolution[dataIncidencesResolution.length - 1].date;

      // Extract the year from the first and last date
      const startYear = new Date(firstDate).getFullYear();
      const endYear = new Date(lastDate).getFullYear();

      // Set the year state if both dates match the same year
      if (startYear === endYear) {
        setYear(startYear);
      } else {
        // If the years are different, you may want to handle it differently
        // or use a range like `startYear` to `endYear`.
        setYear(startYear); // For simplicity, we're just using the start year here
      }
    }
  }, [dataIncidencesResolution]);

  if (!completedIncidencesResolution || errorIncidencesResolution) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      {dataIncidencesResolution ? (
        <div className="overflow-auto">
          <HeatMap
            width={900}
            className="card p-4"
            rectSize={13}
            value={dataIncidencesResolution}
            weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
            // Dynamically set the start and end date based on the year
            startDate={year ? new Date(`${year}-01-01`) : new Date()}
            endDate={year ? new Date(`${year}-12-31`) : new Date()}
            panelColors={[
              "#f4decd",
              "#e4b293",
              "#d48462",
              "#c2533a",
              "#ad001d",
              "#6c0012",
            ]}
            rectRender={(props, data) => {
              if (!data.count) return <rect {...props} rx="3" ry="3" />;
              return (
                <rect
                  {...props}
                  rx="3"
                  ry="3"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={`${data.date}: ${data.count || 0} ${
                    data.count > 1 ? "incidencias" : "incidencia"
                  }`}
                />
              );
            }}
            legendRender={(props) => {
              return (
                <rect
                  {...props}
                  rx="3"
                  ry="3"
                />
              );
            }}
          />
          <Tooltip id="my-tooltip" />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default IncidencesResolutionComponent;
