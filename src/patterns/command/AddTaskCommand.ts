import { ITask } from '../../types/task';
import { ICommand } from './ICommand';

export class AddTaskCommand implements ICommand {
  constructor(
    private tasks: ITask[],
    private task: ITask
  ) {}

  execute() {
    this.tasks.push(this.task);
  }

  undo() {
    const idx = this.tasks.findIndex(t => t.id === this.task.id);
    if (idx !== -1) this.tasks.splice(idx, 1);
  }

  serialize(): string {
    return JSON.stringify({ type: 'add', task: this.task });
  }

  static deserialize(data: string, tasks: ITask[]): ICommand {
    const parsed = JSON.parse(data);
    return new AddTaskCommand(tasks, parsed.task);
  }
}
