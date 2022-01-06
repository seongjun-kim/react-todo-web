import React from 'react';
import { useLocation } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';

import { renderWithMemoryRouter } from 'Libs/utils';

describe('<List />', () => {
  it('renders component correctly', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    const { container } = renderWithMemoryRouter();

    const toDoItem1 = screen.getByText(sampleData[0]);
    expect(toDoItem1).toBeInTheDocument();
    expect(toDoItem1.getAttribute('href')).toBe('/detail/0');

    const toDoItem2 = screen.getByText(sampleData[1]);
    expect(toDoItem2).toBeInTheDocument();
    expect(toDoItem2.getAttribute('href')).toBe('/detail/1');

    const toDoItem3 = screen.getByText(sampleData[2]);
    expect(toDoItem3).toBeInTheDocument();
    expect(toDoItem3.getAttribute('href')).toBe('/detail/2');

    expect(screen.getAllByText('Delete').length).toBe(3);

    const AddButton = screen.getByText('+');
    expect(AddButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('deletes todo item', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    renderWithMemoryRouter();

    const toDoItem = screen.getByText(sampleData[1]);
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem.nextElementSibling as HTMLElement); // click delete button of the toDoItem
    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain([sampleData[1]]);
  });

  it('moves to detail page', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };
    renderWithMemoryRouter({}, <TestComponent />);

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const toDoItem = screen.getByText(sampleData[2]);
    expect(toDoItem).toBeInTheDocument();
    expect(toDoItem.getAttribute('href')).toBe('/detail/2');
    fireEvent.click(toDoItem);

    expect(url.textContent).toBe('/detail/2');
  });

  it('moves to add page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };
    renderWithMemoryRouter({}, <TestComponent />);

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();
    expect(addButton.getAttribute('href')).toBe('/add');
    fireEvent.click(addButton);

    expect(url.textContent).toBe('/add');
  });
});
