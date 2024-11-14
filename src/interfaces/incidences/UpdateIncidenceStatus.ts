import { IncidenceStatus } from "../../enums/incidenceStatus";

export interface UpdateIncidenceStatus {
  statusId: IncidenceStatus;
  changedBy: number;
  resolutionDetails: string;
}
