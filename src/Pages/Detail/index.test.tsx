import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoListProvider } from 'Contexts';
import { Detail } from './index';
import { renderWithRouter } from 'Libs/utils';
import { MemoryRouter, Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import { List } from 'Pages';

describe('<Detail />', () => {
  const sampleData = ['ToDo 1'];
  localStorage.setItem('ToDoList', JSON.stringify(sampleData));
  it('renders component correctly', () => {
    const { container } = renderWithRouter(
      <ToDoListProvider>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </ToDoListProvider>,
      { route: '/detail/0' },
    );

    const toDoItem = screen.getByText(sampleData[0]);
    expect(toDoItem).toBeInTheDocument();

    const button = screen.getByText('Delete');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders nothing without id', () => {
    renderWithRouter(
      <ToDoListProvider>
        <Routes>
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </ToDoListProvider>,
      { route: '/detail' },
    );

    expect(screen.queryAllByText(sampleData[0]).length).toBe(0);
    expect(screen.queryAllByText('Delete').length).toBe(0);
  });

  it('deletes ToDo data', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    render(
      <MemoryRouter initialEntries={['/', '/detail/0']}>
        <TestComponent />
        <ToDoListProvider>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </ToDoListProvider>
      </MemoryRouter>,
    );

    const url = screen.getByText('/detail/0');
    expect(url).toBeInTheDocument();

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();
    const button = screen.getByText('Delete');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(url.textContent).toBe('/');
    expect(toDoItem).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
});
