//Снимок 
export class TaskMemento {
  constructor(private state: any) {}

  getState() {
    return this.state;
  }
}
