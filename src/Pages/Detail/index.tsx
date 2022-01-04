import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Styled from 'styled-components';

import { ToDoListContext } from 'Contexts';
import { Button } from 'Components';

const Container = Styled.div`
    display: flex;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
    align-items: center;
    flex-direction: column;
`;

const ToDo = Styled.div`
    min-width: 350px;
    height: 350px;
    overflow-y: auto;
    border: 1px solid #bdbdbd;
    margin-bottom: 20px;
    padding: 10px;
`;

export const Detail = () => {
  const navigate = useNavigate();
  const { toDoList, deleteToDo } = useContext(ToDoListContext);
  const params = useParams();
  if (!params.id) return <></>;
  const id = Number.parseInt(params.id);
  const toDo = toDoList[id];

  return (
    <Container>
      <ToDo>{toDo}</ToDo>
      <Button
        label="Delete"
        backgroundColor="#ff1744"
        hoverColor="#f01440"
        onClick={() => {
          deleteToDo(id);
          navigate(-1);
        }}
      />
    </Container>
  );
};
