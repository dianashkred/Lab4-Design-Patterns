import { Observer } from './Observer';

export class Observable {
  private observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(event: string) {
    for (const o of this.observers) {
      o.update(event);
    }
  }
}
