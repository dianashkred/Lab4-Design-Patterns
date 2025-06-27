import { StatusStrategy } from './StatusStrategy';

export class InProgressStrategy implements StatusStrategy {
  getLabel(): string {
    return 'В процессе';
  }
}
