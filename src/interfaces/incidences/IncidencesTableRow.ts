import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";

export interface IncidencesTableRow {
    id: number;
    title: string;
    status: IncidenceStatus;
    priority: IncidencePriority;
    assignedTo: string;
}