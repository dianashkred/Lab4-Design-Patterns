import { ITask } from '../../../types/task';
import { SortStrategy } from './SortStrategy';

export class DefaultStrategy implements SortStrategy {
  sort(tasks: ITask[]): ITask[] {
    return [...tasks];
  }
}
