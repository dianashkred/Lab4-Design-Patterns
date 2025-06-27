//Создатель 
import { TaskMemento } from './Memento';

export class Originator {
  private state: any;

  save(): TaskMemento {
    return new TaskMemento(this.state);
  }

  restore(memento: TaskMemento) {
    this.state = memento.getState();
  }

  changeState(state: any) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}
