import { ITask } from '../../../types/task';
import { SortStrategy } from './SortStrategy';

export class SortContext {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  getStrategy() {
    return this.strategy;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sort(tasks: ITask[]): ITask[] {
    return this.strategy.sort(tasks);
  }
}
