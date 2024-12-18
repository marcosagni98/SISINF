import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { SortDirection } from "../../interfaces/shared/PaginationProps";

interface Header {
  key: string;
  label: string;
  sortable: boolean;
  render?: (data: any) => React.ReactNode;
}

interface TableProps<T> {
  headers: Header[];
  data: T[];
  completed: boolean;
  error: string | null;
  onSort: (column: string) => void;
  sortColumn: string;
  sortDirection: SortDirection;
}

/**
 * Generic table component to display tabular data with sorting functionality.
 * Handles rendering headers, data rows, and loading states with skeleton placeholders.
 */
const GenericTableComponent = <T extends {}>({
  headers,
  data,
  completed,
  error,
  onSort,
  sortColumn,
  sortDirection,
}: TableProps<T>) => {
  return (
    <div className="table-responsive card p-0">
      <table className="table table-borderless table-striped m-0">
        <thead>
          <tr className="text-uppercase">
            {headers.map((header, index) => (
              <th
                key={index}
                onClick={() => onSort(header.key)}
                className="fw-semibold"
              >
                {/* Display header label with sorting icons if sortable */}
                {header.label}
                {header.sortable ? (
                  <>
                    {" "}
                    {sortColumn === header.key ? (
                      sortDirection === "asc" ? (
                        <FontAwesomeIcon icon={faSortUp} />
                      ) : (
                        <FontAwesomeIcon icon={faSortDown} />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faSort} />
                    )}
                  </>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Show skeletons if data is loading or there is an error */}
          {!completed || error ? (
            <>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  {headers.map((header, index) => (
                    <td key={index}>
                      <Skeleton width={100} />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ) : (
            <>
              {data.map((row, index) => (
                  <tr key={index}>
                    {headers.map((header, index) => (
                      <td key={index}>
                        {/* Use custom render function if provided, otherwise display raw data */}
                        {header.render
                        ? header.key === "row"
                          ? header.render(row as any)
                          : header.render((row as any)[header.key])
                          : (row as any)[header.key]}
                      </td>
                    ))}
                  </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTableComponent;
