import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #6B7280;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4B5563;
  }
`;

const SortSelect = styled.select`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f9fafb;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    border-color: #4A90E2;
  }

  &:focus {
    border-color: #4A90E2;
  }
`;

interface Props {
  onUndo: () => void;
  onRedo: () => void;
  sortType: string;
  setSortType: (value: string) => void;
}


const ControlPanel: React.FC<Props> = ({ onUndo, onRedo, sortType, setSortType }) => (
  <Wrapper>
    <SortSelect value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="default">Без сортировки</option>
        <option value="title">По названию</option>
        <option value="priority">По приоритету</option>
    </SortSelect>
    <Button onClick={onUndo}>Undo</Button>
    <Button onClick={onRedo}>Redo</Button>
  </Wrapper>
);

export default ControlPanel;
