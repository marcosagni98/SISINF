import { IncidencePriority } from "../../enums/incidencePriority";
import { IncidenceStatus } from "../../enums/incidenceStatus";

export interface HistoricTableRow {
  id: number;
  title: string;
  description: string;
  priority: IncidencePriority;
  status: IncidenceStatus;
  userId: number;
  technicianId: number;
}
