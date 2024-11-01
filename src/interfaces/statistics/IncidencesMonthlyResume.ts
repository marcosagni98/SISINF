import { Dictionary } from "../../utils/interfaces/Dictionary";

export interface IncidencesMonthlyResume {
    incidencesByMonth: Dictionary<number>;
    changeRatioFromLastMonths: number;
    count: number;
}