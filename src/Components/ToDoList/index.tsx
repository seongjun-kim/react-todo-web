import React from 'react';
import Styled from 'styled-components';

import { ToDoItem } from 'Components/ToDoItem';

const Container = Styled.div`
    min-width: 350px;
    height: 400px;
    overflow-y: scroll;
    border: 1px solid #BDBDBD;
    margin-bottom: 20px;
`;

interface Props {
  readonly data: string[];
  readonly handleDelete: (index: number) => void;
}

export const ToDoList = ({ data, handleDelete }: Props) => {
  return (
    <Container data-testid="toDoList">
      {data.map((item, index) => (
        <ToDoItem key={item} label={item} onDelete={() => handleDelete(index)} />
      ))}
    </Container>
  );
};
