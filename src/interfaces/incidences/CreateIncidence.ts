import { IncidencePriority } from "../../enums/incidencePriority";

export interface CreateIncidence {
  title: string;
  description: string;
  priority: IncidencePriority | null;
  userId: number | null;
}
