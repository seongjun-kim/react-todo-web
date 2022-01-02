import React from 'react';
import Styled from 'styled-components';
// import { Button } from 'Components'; // index에서 끌어오면 무한 반복 참조가 일어남
import { Button } from 'Components/Button'; // 직접 import

const Container = Styled.div`
    display: flex;
    border-bottom: 1px solid #bdbdbd;
    align-items: center;
    margin: 10px;
    padding: 10px;
`;

const Label = Styled.div`
    flex: 1;
    font-size: 16px;
    margin-right: 20px;
`;

interface Props {
  readonly label?: string;
  readonly onDelete?: () => void;
}

export const ToDoItem = ({ label, onDelete }: Props) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Button label="Delete" backgroundColor="#ff1744" hoverColor="#f01440" onClick={onDelete} />
    </Container>
  );
};
