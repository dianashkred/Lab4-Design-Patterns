import { ICommand } from './ICommand';
import { TaskStorage } from '../singleton/TaskStorage';
import { AddTaskCommand } from './AddTaskCommand';
import { DeleteTaskCommand } from './DeleteTaskCommand';
import { Originator } from '../memento/Originator';
import { Caretaker } from '../memento/Caretaker';

export class CommandManager {
  private undoStack: ICommand[] = [];
  private redoStack: ICommand[] = [];
  private caretaker: Caretaker;

  constructor(private tasks: any[], private onChange: () => void, originator: Originator) {
    this.caretaker = new Caretaker(originator); 
  }

  executeCommand(cmd: ICommand) {
    this.caretaker.saveState(); 
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack = [];
    this.sync();
    this.onChange();
  }

  undo() {
    const cmd = this.undoStack.pop();
    if (cmd) {
      cmd.undo();
      this.redoStack.push(cmd);
      this.caretaker.undo();
      this.sync();
      this.onChange();
    }
  }

  redo() {
    const cmd = this.redoStack.pop();
    if (cmd) {
      cmd.execute();
      this.undoStack.push(cmd);
      this.sync();
      this.onChange();
    }
  }

  sync() {
    TaskStorage.getInstance().save({
      tasks: this.tasks,
      undoStack: this.undoStack.map(cmd => cmd.serialize()),
      redoStack: this.redoStack.map(cmd => cmd.serialize()),
    });
  }

  restore(serializedUndo: string[], serializedRedo: string[]) {
    this.undoStack = serializedUndo.map(str => {
      const obj = JSON.parse(str);
      return obj.type === 'add'
        ? AddTaskCommand.deserialize(str, this.tasks)
        : DeleteTaskCommand.deserialize(str, this.tasks);
    });

    this.redoStack = serializedRedo.map(str => {
      const obj = JSON.parse(str);
      return obj.type === 'add'
        ? AddTaskCommand.deserialize(str, this.tasks)
        : DeleteTaskCommand.deserialize(str, this.tasks);
    });
  }
}
