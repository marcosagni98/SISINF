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
 * GenericTableComponent
 *
 * This component renders a generic, sortable table with skeleton loading indicators.
 * It is reusable and accepts dynamic data and headers.
 *
 * @template T - Type of data items displayed in each row.
 * @param {TableProps<T>} props - The component's properties.
 * @returns {React.ReactElement} - Rendered table with headers, data rows, and sorting icons.
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
            {headers.map((header) => (
              <th
                key={header.key}
                onClick={() => onSort(header.key)}
                className="fw-semibold bg-dark text-light"
              >
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
          {!completed || error ? (
            <>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header.key}>
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
                  {headers.map((header) => (
                    <td key={header.key}>
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
