import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";

export interface IncidenceDetails {
    id: number;
    title: string;
    description: string;
    priority: IncidencePriority;
    status: IncidenceStatus;
    createdAt: string;
    userId: number;
    userName: string;
    technicianId: number | null;
    technicianName: string;
}