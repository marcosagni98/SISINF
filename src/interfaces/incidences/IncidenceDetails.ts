import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";

export interface IncidenceDetails {
    id: number;
    title: string;
    description: string;
    priority: IncidencePriority;
    status: IncidenceStatus;
    createdAt: Date;
    userId: number;
    technicianId: number;
}