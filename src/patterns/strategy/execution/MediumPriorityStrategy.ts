import { ExecutionStrategy } from './ExecutionStrategy';

export class MediumPriorityStrategy implements ExecutionStrategy {
  getLabel(): string {
    return '🟡 Средний приоритет';
  }
  getColor(): string {
    return '#facc15'; 
  }
}
