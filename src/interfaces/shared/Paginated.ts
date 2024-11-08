/**
 * Interface representing a paginated response with a list of items
 * @interface Pagination
 * @template T - The type of the items in the pagination list
 * @property {T[]} items - An array of items of type T in the current page
 * @property {number} totalCount - The total number of items across all pages
 */

export interface Pagination<T> {
    items: T[];
    totalCount: number;
}