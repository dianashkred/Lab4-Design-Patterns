
import { StatusStrategy } from './StatusStrategy';

export class StatusContext {
  private strategy: StatusStrategy;

  constructor(strategy: StatusStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: StatusStrategy): void {
    this.strategy = strategy;
  }

  getLabel(): string {
    return this.strategy.getLabel();
  }

}
