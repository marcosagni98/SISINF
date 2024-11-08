/**
 * Interface representing the pagination settings for a list of items
 * @interface PaginationProps
 * @property {number} pageNumber - The current page number in the pagination
 * @property {number} pageSize - The number of items per page in the pagination
 * @property {string} search - The search query to filter items in the list
 * @property {string} orderBy - The field by which to order the items in the list
 * @property {SortDirection} orderDirection - The direction in which to order the items, either ascending or descending
 */

export interface PaginationProps {
    pageNumber: number;
    pageSize: number;
    search: string;
    orderBy: string;
    orderDirection: SortDirection;
}

export type SortDirection = "asc" | "desc";