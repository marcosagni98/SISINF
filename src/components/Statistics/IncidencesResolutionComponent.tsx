import React, { useEffect, useState } from "react";
import HeatMap from '@uiw/react-heat-map';
import useFetchIncidencesByDay from "../../hooks/statistics/useFetchIncidencesByDay";

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
      const lastDate = dataIncidencesResolution[dataIncidencesResolution.length - 1].date;

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
        <HeatMap
          width={750}
          value={dataIncidencesResolution}
          weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
          // Dynamically set the start and end date based on the year
          startDate={year ? new Date(`${year}-01-01`) : new Date()}
          endDate={year ? new Date(`${year}-12-31`) : new Date()}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default IncidencesResolutionComponent;
