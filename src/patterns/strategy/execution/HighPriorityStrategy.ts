import { ExecutionStrategy } from './ExecutionStrategy';

export class HighPriorityStrategy implements ExecutionStrategy {
  getLabel(): string {
    return '🔴 Высокий приоритет';
  }
  getColor(): string {
    return '#dc2626';
  }
}
