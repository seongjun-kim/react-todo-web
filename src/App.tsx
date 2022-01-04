import React from 'react';
import Styled from 'styled-components';
import { useRoutes } from 'react-router-dom';
import { List, Add, Detail, NotFound } from 'Pages';
import { ToDoListProvider } from 'Contexts';
import { PageHeader } from 'Components';

const Container = Styled.div`
  min-height: 100vh;
  display: flexx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Routes = () =>
  useRoutes([
    { path: '/', element: <List /> },
    { path: '/add', element: <Add /> },
    { path: '/detail/:id', element: <Detail /> },
    { path: '*', element: <NotFound /> },
  ]);

function App() {
  return (
    <ToDoListProvider>
      <Container>
        <PageHeader />
        <Routes />
      </Container>
    </ToDoListProvider>
  );
}

export default App;
