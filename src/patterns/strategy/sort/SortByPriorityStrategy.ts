import { ITask } from '../../../types/task';
import { SortStrategy } from './SortStrategy';

export class SortByPriorityStrategy implements SortStrategy {
  private priorityValue(priority: string): number {
    switch (priority.toLowerCase()) {
      case 'high': return 1;
      case 'medium': return 2;
      case 'low': return 3;
      default: return 4;
    }
  }

  sort(tasks: ITask[]): ITask[] {
    return [...tasks].sort((a, b) => this.priorityValue(a.priority) - this.priorityValue(b.priority));
  }
}
