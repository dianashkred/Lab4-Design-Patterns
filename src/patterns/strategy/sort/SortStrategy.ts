import { ITask } from '../../../types/task';

export interface SortStrategy {
  sort(tasks: ITask[]): ITask[];
}
