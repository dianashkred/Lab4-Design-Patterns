import React, { useState } from 'react';
import styled from 'styled-components';

interface TaskFormProps {
  onAdd: (title: string, priority: 'high' | 'medium' | 'low') => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), priority); 
      setTitle('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
      >
        <option value="high">Высокий</option>
        <option value="medium">Средний</option>
        <option value="low">Низкий</option>
      </Select>
      <AddButton type="submit">Добавить</AddButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  gap: 20px;
  margin-bottom: 1rem;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 50%;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4A90E2;
  }
`;
const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ABD;
  }
`;
