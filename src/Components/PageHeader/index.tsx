import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Styled from 'styled-components';

const Container = Styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1e40ff;
`;

const Title = Styled.div`
    padding: 20px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
`;
const GoBack = Styled(Link)`
    padding: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    position: absolute;
    left: 20px;
`;

export const PageHeader = () => {
  const { pathname } = useLocation();
  let title = 'Error';

  if (pathname === '/') {
    title = 'Todo List';
  } else if (pathname === '/add') {
    title = 'Add Todo';
  } else if (pathname.startsWith('/detail')) {
    title = 'Todo In Detail';
  }

  return (
    <Container>
      <Title>{title}</Title>
      {pathname !== '/' && <GoBack to="/">Go Back...</GoBack>}
    </Container>
  );
};
