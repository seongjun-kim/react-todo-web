import React from 'react';
import Styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { List, Add, Detail } from 'Pages';
import { ToDoListProvider } from 'Contexts';

const Container = Styled.div`
  min-height: 100vh;
  display: flexx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <ToDoListProvider>
      <Container>
        <Routes>
          <Route path={'/'} element={<List />} />
          <Route path={'/add'} element={<Add />} />
          <Route path={'/detail/:id'} element={<Detail />} />
        </Routes>
      </Container>
    </ToDoListProvider>
  );
}

export default App;
