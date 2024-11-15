import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

/**
 * Component for rendering pagination controls.
 * Allows users to navigate between pages and change the number of items displayed per page.
 */
const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  /** Maximum number of page buttons to display */
  const maxPageButtons = 5;
  /** Calculate the starting page number for pagination buttons */
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  /** Calculate the ending page number for pagination buttons */
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  /**
   * Handles changes to the page size dropdown.
   * Calls the onPageSizeChange callback with the selected size.
   */
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      onPageSizeChange(newSize);
    }
  };

  return (
    <div>
      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        {/* Button to navigate to the first page */}
        {currentPage > 1 && (
          <button
            className="btn mx-1 btn-secondary"
            onClick={() => onPageChange(1)}
          >
            Primero
          </button>
        )}
        {/* Button to navigate to the previous set of pages */}
        {startPage > 1 && (
          <button
            className="btn mx-1 btn-secondary"
            onClick={() => onPageChange(startPage - 1)}
          >
            &lt;
          </button>
        )}

        {/* Page number buttons */}
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              className={`btn mx-1 ${
                currentPage === page ? "btn-dark" : "btn-secondary"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}

        {/* Button to navigate to the next set of pages */}
        {endPage < totalPages && (
          <button
            className="btn mx-1 btn-secondary"
            onClick={() => onPageChange(endPage + 1)}
          >
            &gt;
          </button>
        )}
        {/* Button to navigate to the last page */}
        {currentPage < totalPages && (
          <button
            className="btn mx-1 btn-secondary"
            onClick={() => onPageChange(totalPages)}
          >
            Último
          </button>
        )}
      </div>

      {/* Page Size Selector */}
      <div className="mt-3">
        <label htmlFor="pageSize" className="me-2">
          Tamaño de página:
        </label>
        <select
          id="pageSize"
          className="form-select d-inline w-auto"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationComponent;
