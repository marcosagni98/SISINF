export interface IncidentCountByDate {
    date: string; // Usamos string ya que la fecha está en formato ISO
    count: number; // Almacenamos el conteo como número
  }
  
  export type IncidentCountByDateArray = IncidentCountByDate[]; // Tipo para un array de estos objetos
  