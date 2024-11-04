import { IncidenceStatus } from "../../enums/incidenceStatus";

export interface IncidenceHistory {
    status: IncidenceStatus;
    changedAt: string;
    changedBy: number;
    changedByUserName: string;
    resolutionDetails: string;
}