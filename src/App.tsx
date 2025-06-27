import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { TaskForm } from './components/TaskForm';
import TaskList from './components/TaskList';
import { ITask } from './types/task';
import { TaskManagerFacade } from './patterns/facade/TaskManagerFacade';
import ControlPanel from './components/ControlPanel';
import { SortByPriorityStrategy } from './patterns/strategy/sort/SortByPriorityStrategy';
import { SortByTitleStrategy } from './patterns/strategy/sort/SortByTitleStrategy';
import { DefaultStrategy } from './patterns/strategy/sort/DefaultStrategy';
import { SortContext } from './patterns/strategy/sort/SortContext';
import { Logger } from './patterns/observer/Logger';


const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [sortType, setSortType] = useState<string>('default');
  
  const sortContextRef = useRef<SortContext>(new SortContext(new DefaultStrategy()));
  const facadeRef = useRef<TaskManagerFacade | null>(null);

  const handleStatusChange = (task: ITask, status: any) => {
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, status: status } : t
    );
    setTasks(updatedTasks); 
  };

  useEffect(() => {
    const facade = new TaskManagerFacade(tasks, () => {
      setTasks([...tasks]);  
    });
    facade.attach(new Logger());
    facadeRef.current = facade;
  }, []); 

  useEffect(() => {
    switch (sortType) {
      case 'title':
        sortContextRef.current.setStrategy(new SortByTitleStrategy());
        break;
      case 'priority':
        sortContextRef.current.setStrategy(new SortByPriorityStrategy());
        break;
      default:
        sortContextRef.current.setStrategy(new DefaultStrategy());
    }
  }, [sortType]);

  useEffect(() => {
    const sortedTasks = sortContextRef.current.sort([...tasks]); 
    if (JSON.stringify(sortedTasks) !== JSON.stringify(tasks)) { 
      setTasks(sortedTasks);  
    }
  }, [tasks, sortType]);

  return (
    <Container>
      <Header>📋 Task Tracker</Header>

      <Wrapper>
        <TaskForm
          onAdd={(title, priority) => {
            const newTask: ITask = {
              id: uuidv4(),
              title,
              type: 'simple',
              priority: priority.toLowerCase() as 'high' | 'medium' | 'low',
              status: 'notStarted', 
            };
            facadeRef.current?.createTask(newTask);  
          }}
        />
      </Wrapper>

      <ControlPanel
        onUndo={() => facadeRef.current?.undo()}
        onRedo={() => facadeRef.current?.redo()}
        sortType={sortType}         
        setSortType={setSortType}
      />

      <TaskList
        tasks={tasks}
        onDelete={(task) => facadeRef.current?.deleteTask(task)} 
        onStatusChange={handleStatusChange}  
        sortStrategy={sortContextRef.current.getStrategy()}  
      />
    </Container>
  );
};

export default App;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #333;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;  
  text-align: center;       
  width: 100%;
`;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
`;
