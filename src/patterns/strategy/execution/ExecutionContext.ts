import { ExecutionStrategy } from './ExecutionStrategy';

export class ExecutionContext {
  private strategy: ExecutionStrategy;

  constructor(strategy: ExecutionStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ExecutionStrategy): void {
    this.strategy = strategy;
  }

  getLabel(): string {
    return this.strategy.getLabel();
  }

  getColor(): string {
    return this.strategy.getColor();
  }
}
