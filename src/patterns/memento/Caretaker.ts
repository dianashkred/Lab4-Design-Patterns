//Опекун 
import { TaskMemento } from './Memento';
import { Originator } from './Originator';

export class Caretaker {
  private history: TaskMemento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  saveState() {
    this.history.push(this.originator.save());
  }

  undo() {
    const memento = this.history.pop();
    if (memento) {
      this.originator.restore(memento);
    }
  }
}
