export interface CreateIncidence {
  title: string;
  description: string;
  priority: number;
  status: number;
  createdAt: string;
  userId: number;
  technicianId: number;
}
