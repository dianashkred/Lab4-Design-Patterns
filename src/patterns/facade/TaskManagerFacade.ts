import { ITask } from '../../types/task';
import { CommandManager } from '../command/CommandManager';
import { AddTaskCommand } from '../command/AddTaskCommand';
import {  DeleteTaskCommand } from '../command/DeleteTaskCommand';
import { TaskStorage } from '../singleton/TaskStorage';
import { Originator } from '../memento/Originator';
import { Observable } from '../observer/Observable';

export class TaskManagerFacade extends Observable {
  private commandManager: CommandManager;

  constructor(private tasks: ITask[], private onChange: () => void) {
    super();  
    const originator = new Originator();
    this.commandManager = new CommandManager(this.tasks, this.onChange, originator);

    const saved = TaskStorage.getInstance().load();
    if (saved) {
      tasks.splice(0, tasks.length, ...saved.tasks);
      this.commandManager.restore(saved.undoStack, saved.redoStack);
      this.onChange();
      this.notify('[Facade] history restored');
    }
  }

  createTask(task: ITask) {
    const cmd = new AddTaskCommand(this.tasks, task);
    this.commandManager.executeCommand(cmd);
    this.notify(`[Facade] task created: ${task.id}`);
  }

  deleteTask(task: ITask) {
    const cmd = new DeleteTaskCommand(this.tasks, task);
    this.commandManager.executeCommand(cmd);
    this.notify(`[Facade] task deleted: ${task.id}`);
  }

  undo() {
    this.commandManager.undo();
    this.notify('[Facade] undo performed');
  }

  redo() {
    this.commandManager.redo();
    this.notify('[Facade] redo performed');
  }

  changeTaskStatus(task: ITask, status: 'notStarted' | 'inProgress' | 'completed') {
    const taskToUpdate = this.tasks.find(t => t.id === task.id);
    if (taskToUpdate) {
      taskToUpdate.status = status;
      this.onChange();
      
    }
  }
}
