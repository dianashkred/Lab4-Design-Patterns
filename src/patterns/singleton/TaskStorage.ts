import { ITask } from '../../types/task';

interface PersistedState {
  tasks: ITask[];
  undoStack: string[];
  redoStack: string[];
}

export class TaskStorage {
  private static instance: TaskStorage;
  private key = 'task-tracker-data';

  private constructor() {}

  public static getInstance(): TaskStorage {
    if (!TaskStorage.instance) {
      TaskStorage.instance = new TaskStorage();
    }
    return TaskStorage.instance;
  }

  save(state: PersistedState) {
    localStorage.setItem(this.key, JSON.stringify(state));
  }

  load(): PersistedState | null {
    const raw = localStorage.getItem(this.key);
    if (!raw) return null;
    return JSON.parse(raw);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
