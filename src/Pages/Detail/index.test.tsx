import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';
import { renderWithMemoryRouter } from 'Libs/utils';
import { useLocation } from 'react-router-dom';

describe('<Detail />', () => {
  const sampleData = ['ToDo 1'];
  localStorage.setItem('ToDoList', JSON.stringify(sampleData));
  it('renders component correctly', () => {
    const { container } = renderWithMemoryRouter({
      initialEntries: ['/detail/0'],
    });

    const toDoItem = screen.getByText(sampleData[0]);
    expect(toDoItem).toBeInTheDocument();

    const button = screen.getByText('Delete');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders nothing without id', () => {
    renderWithMemoryRouter({ initialEntries: ['/detail'] });

    expect(screen.queryAllByText(sampleData[0]).length).toBe(0);
    expect(screen.queryAllByText('Delete').length).toBe(0);
  });

  it('deletes ToDo data', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };
    renderWithMemoryRouter(
      {
        initialEntries: ['/', '/detail/0'],
        initialIndex: 1,
      },
      <TestComponent />,
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
