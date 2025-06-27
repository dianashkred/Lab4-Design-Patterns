import React from 'react';
import styled from 'styled-components';
import { ITask } from '../types/task';
import { StatusContext } from '../patterns/strategy/status/StatusContext';
import { InProgressStrategy } from '../patterns/strategy/status/InProgressStrategy';
import { CompletedStrategy } from '../patterns/strategy/status/CompletedStrategy';
import { DefaultStatusStrategy } from '../patterns/strategy/status/DefaultStatusStrategy';
import { SortStrategy } from '../patterns/strategy/sort/SortStrategy';
import { HighPriorityStrategy } from '../patterns/strategy/execution/HighPriorityStrategy';
import { MediumPriorityStrategy } from '../patterns/strategy/execution/MediumPriorityStrategy';
import { LowPriorityStrategy } from '../patterns/strategy/execution/LowPriorityStrategy';
import { ExecutionContext } from '../patterns/strategy/execution/ExecutionContext';


const Wrapper = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
`;

const TaskName = styled.div`
  font-weight: bold;
`;

const StatusSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const StatusNote = styled.div`
  font-size: 0.9rem;
`;

const DeleteBtn = styled.button`
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(171, 32, 32);
  }
`;

interface Props {
  tasks: ITask[];
  onDelete: (task: ITask) => void;
  onStatusChange: (task: ITask, status: 'notStarted' | 'inProgress' | 'completed') => void;
  sortStrategy: SortStrategy;
}

const getPriorityStrategy = (priority: string) => {
  switch (priority) {
    case 'high':
      return new ExecutionContext(new HighPriorityStrategy());
    case 'medium':
      return new ExecutionContext(new MediumPriorityStrategy());
    case 'low':
      return new ExecutionContext(new LowPriorityStrategy());
    default:
      return new ExecutionContext(new MediumPriorityStrategy());
  }
};

const getStatusStrategy = (status: string) => {
  switch (status) {
    case 'inProgress':
      return new StatusContext(new InProgressStrategy());
    case 'completed':
      return new StatusContext(new CompletedStrategy());
    default:
      return new StatusContext(new DefaultStatusStrategy());
  }
};

const TaskList: React.FC<Props> = ({ tasks, onDelete, onStatusChange, sortStrategy }) => {
  const sortedTasks = sortStrategy.sort(tasks); 

  return (
    <Wrapper>
      <Title>Список задач</Title>
      {sortedTasks.length === 0 ? (
        <p>Нет задач</p>
      ) : (
        <List>
          {sortedTasks.map((task) => {
            const priorityContext = getPriorityStrategy(task.priority); 
            const statusContext = getStatusStrategy(task.status || 'notStarted'); 

            return (
              <ListItem key={task.id}>
                <div>
                  <TaskName>{task.title}</TaskName>
                  <StatusNote style={{ color: priorityContext.getColor() }}>
                    {priorityContext.getLabel()} 
                  </StatusNote>
                </div>
                <StatusSelect
                  value={task.status || 'notStarted'}
                  onChange={(e) =>
                    onStatusChange(task, e.target.value as 'notStarted' | 'inProgress' | 'completed')
                  }
                >
                  <option value="notStarted">Не начато</option>
                  <option value="inProgress">В процессе</option>
                  <option value="completed">Выполнено</option>
                </StatusSelect>
                <DeleteBtn onClick={() => onDelete(task)}>Удалить</DeleteBtn>
              </ListItem>
            );
          })}
        </List>
      )}
    </Wrapper>
  );
};

export default TaskList;
