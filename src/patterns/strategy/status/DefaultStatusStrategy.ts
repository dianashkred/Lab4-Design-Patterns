import { StatusStrategy } from './StatusStrategy';

export class DefaultStatusStrategy implements StatusStrategy {
  getLabel(): string {
    return 'Не начато';
  }

}
