import React from 'react';
import Styled from 'styled-components';
// import { Button } from 'Components'; // index에서 끌어오면 무한 반복 참조가 일어남
import { Button } from 'Components/Button'; // 직접 import
import { Link } from 'react-router-dom';

const Container = Styled.div`
    display: flex;
    border-bottom: 1px solid #bdbdbd;
    align-items: center;
    margin: 10px;
    padding: 10px;
`;

const Label = Styled(Link)`
    flex: 1;
    font-size: 16px;
    margin-right: 20px;
    color: black;
    text-decoration: none;
`;

interface Props {
  readonly id: number;
  readonly label?: string;
  readonly onDelete?: () => void;
}

export const ToDoItem = ({ id, label, onDelete }: Props) => {
  return (
    <Container>
      <Label to={`/detail/${id}`}>{label}</Label>
      <Button label="Delete" backgroundColor="#ff1744" hoverColor="#f01440" onClick={onDelete} />
    </Container>
  );
};
