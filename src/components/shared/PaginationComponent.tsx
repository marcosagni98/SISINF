import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

/**
 * PaginationComponent
 *
 * This component renders pagination controls for navigating through pages
 * of data. It includes buttons to navigate to the first, previous, next,
 * and last pages, as well as numbered buttons for specific pages within
 * a certain range. It also allows the user to select the number of items
 * displayed per page.
 *
 * The component dynamically calculates the range of page buttons to show
 * around the current page, based on the total number of pages and a
 * configurable `maxPageButtons` limit.
 *
 * @component
 * @param {PaginationProps} props - Component properties that define
 * the current page, total pages, page size, and callback functions for
 * changing pages and page size.
 * @returns {React.ReactElement} - A set of pagination controls with page
 * navigation buttons and a page size selector.
 */

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const maxPageButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);


  /**
   * Handle change in page size selection
   *
   * This function updates the page size when a new value is selected
   * from the dropdown, triggering the `onPageSizeChange` callback.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event
   * from the page size dropdown.
   */
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      onPageSizeChange(newSize);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        {currentPage > 1 && (
          <button
            className="btn mx-1 btn-secondary"
            onClick={() => onPageChange(1)}
          >
            Primero
          </button>
        )}
        {startPage > 1 && (
          <button
            className="btn mx-1 btn-secondary"
            onClick={() => onPageChange(startPage - 1)}
          >
            &lt;
          </button>
        )}
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
        {endPage < totalPages && (
          <button
            className="btn mx-1 btn-secondary"
            onClick={() => onPageChange(endPage + 1)}
          >
            &gt;
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="btn mx-1 btn-secondary"
            onClick={() => onPageChange(totalPages)}
          >
            Último
          </button>
        )}
      </div>
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
