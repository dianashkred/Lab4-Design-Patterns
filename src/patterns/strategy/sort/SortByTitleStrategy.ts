import { ITask } from '../../../types/task';
import { SortStrategy } from './SortStrategy';

export class SortByTitleStrategy implements SortStrategy {
  sort(tasks: ITask[]): ITask[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }
}
