/**
 * Defines the structure of pagination parameters for requests.
 * 
 * @interface PaginationProps
 * @property {number} pageNumber - The current page number to retrieve.
 * @property {number} pageSize - The number of items to retrieve per page.
 * @property {string} search - A search term to filter items.
 * @property {string} orderBy - The field by which to sort the items.
 * @property {SortDirection} orderDirection - The direction of sorting, either ascending or descending.
 * 
 * @type SortDirection - Specifies the sorting order direction.
 *                        Accepts either "asc" for ascending or "desc" for descending.
 */
export interface PaginationProps {
    pageNumber: number;
    pageSize: number;
    search: string;
    orderBy: string;
    orderDirection: SortDirection;
}

export type SortDirection = "asc" | "desc";