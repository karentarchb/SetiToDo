export interface Task {
  id?: string;
  description?: string;
  completed: boolean;
  startTime?: string;
  endTime?: string;
  repeatDays?: number[];
  createdAt: Date;
  userId: string;
}
