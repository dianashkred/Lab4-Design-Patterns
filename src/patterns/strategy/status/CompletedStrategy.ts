import { StatusStrategy } from './StatusStrategy';

export class CompletedStrategy implements StatusStrategy {
  getLabel(): string {
    return 'Выполнено';
  }
}
