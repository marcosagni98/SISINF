/**
 * Represents a paginated response structure containing a list of items and the total count.
 * 
 * @template T - The type of items contained in the paginated response.
 * 
 * @interface Pagination
 * @property {T[]} items - The array of items of type T on the current page.
 * @property {number} totalCount - The total number of items available across all pages.
 */
export interface Pagination<T> {
    items: T[];
    totalCount: number;
}