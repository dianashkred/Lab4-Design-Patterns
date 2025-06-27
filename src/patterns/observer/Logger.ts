import { Observer } from './Observer';

export class Logger implements Observer {
  update(event: string) {
    console.log(`[LOG] ${event}`);
  }
}
