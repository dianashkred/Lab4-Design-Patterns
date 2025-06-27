export interface ITask {
  id: string;
  title: string;
  type: 'simple' | 'composite';
  priority: 'high' | 'medium' | 'low';
  status?: 'notStarted' | 'inProgress' | 'completed';
}
