import { ITask } from '../../types/task';
import { ICommand } from './ICommand';

export class DeleteTaskCommand implements ICommand {
  constructor(
    private tasks: ITask[],
    private task: ITask
  ) {}

  execute() {
    const index = this.tasks.findIndex(t => t.id === this.task.id);
    if (index !== -1) this.tasks.splice(index, 1);
  }

  undo() {
    this.tasks.push(this.task);
  }

  serialize(): string {
    return JSON.stringify({ type: 'delete', task: this.task });
  }

  static deserialize(data: string, tasks: ITask[]): ICommand {
    const parsed = JSON.parse(data);
    return new DeleteTaskCommand(tasks, parsed.task);
  }
}
