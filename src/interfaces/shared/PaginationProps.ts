export interface PaginationProps {
    pageNumber: number;
    pageSize: number;
    search: string;
    orderBy: string;
    orderDirection: SortDirection;
}

export type SortDirection = "asc" | "desc";