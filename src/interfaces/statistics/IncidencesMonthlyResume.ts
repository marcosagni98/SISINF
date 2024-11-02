import { Dictionary } from "../shared/Dictionary";

export interface IncidencesMonthlyResume {
    incidencesByMonth: Dictionary<number>;
    changeRatioFromLastMonths: number;
    count: number;
}