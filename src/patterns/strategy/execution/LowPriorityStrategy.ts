// src/strategies/execution/LowPriorityStrategy.ts

import { ExecutionStrategy } from './ExecutionStrategy';

export class LowPriorityStrategy implements ExecutionStrategy {
  getLabel(): string {
    return '🟢 Низкий приоритет';
  }
  getColor(): string {
    return '#16a34a'; // green-600
  }
}
