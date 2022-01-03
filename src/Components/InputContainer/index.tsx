import React, { useState, useContext } from 'react';
import Styled from 'styled-components';
import { ToDoListContext } from 'Contexts';
import { Button } from 'Components/Button';
import { Input } from 'Components/Input';

const Container = Styled.div`
    display:flex;
`;

export const InputContainer = () => {
  const [toDo, setToDo] = useState('');
  const { addToDo } = useContext(ToDoListContext);

  return (
    <Container>
      <Input placeholder="Enter what to do..." value={toDo} onChange={setToDo} />
      <Button
        label="Add"
        onClick={() => {
          addToDo(toDo);
          setToDo('');
        }}
      />
    </Container>
  );
};
