import { IncidenceHistory } from "./IncidenceHistory";
import { IncidenceMessage } from "./IncidenceMessage";
import { IncidenceWorkLog } from "./IncidenceWorkLog";

export interface IncidenceDetails {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: Date;
    createdBy: string;
    assignedTo: string;
    workLogs: IncidenceWorkLog[];
    messages: IncidenceMessage[];
    history: IncidenceHistory[];
}