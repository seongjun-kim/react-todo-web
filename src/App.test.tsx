import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from './App';
import 'jest-styled-components';
import { renderWithMemoryRouter } from 'Libs/utils';
import { useLocation } from 'react-router-dom';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = renderWithMemoryRouter();

    const header = screen.getByText('Todo List');
    expect(header).toBeInTheDocument();

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('goes to Add page and comes back to List page', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };
    const { container } = renderWithMemoryRouter({}, <TestComponent />);

    const header = screen.getByText('Todo List');
    const url = screen.getByText('/');

    const plusButton = screen.getByText('+');
    expect(plusButton).toBeInTheDocument();

    fireEvent.click(plusButton);

    expect(plusButton).not.toBeInTheDocument();
    expect(header.textContent).toBe('Add Todo');
    expect(url.textContent).toBe('/add');
    const goBackButton = screen.getByText('Go Back...');
    expect(goBackButton).toBeInTheDocument();
    const addButton = screen.getByText('Add');
    expect(addButton).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Enter what to do...');
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    fireEvent.click(goBackButton);
    expect(header.textContent).toBe('Todo List');
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });

  it('adds a new todo in add page and comes back to List page', () => {
    renderWithMemoryRouter();

    let toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childNodes.length).toBe(0);

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);

    const input = screen.getByPlaceholderText('Enter what to do...');
    const addButton = screen.getByText('Add');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    const header = screen.getByText('Todo List');
    expect(header).toBeInTheDocument();
    const newToDo = screen.getByText('New Todo');
    expect(newToDo).toBeInTheDocument();
    toDoList = screen.getByTestId('toDoList'); // testId로 조회한 ToDoList 컴포넌트의 렌더링 갱신
    expect(toDoList.childNodes.length).toBe(1);
    expect(localStorage.getItem('ToDoList')).toBe('["New Todo"]');
  });

  it('goes to Detail page and comes back to List page', () => {
    const sampleData = ['Todo 1', 'Todo 2'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };
    const { container } = renderWithMemoryRouter({}, <TestComponent />);

    const header = screen.getByText('Todo List');
    const url = screen.getByText('/');

    const toDoItem = screen.getByText(sampleData[0]);
    expect(toDoItem).toBeInTheDocument();
    expect(toDoItem.getAttribute('href')).toBe('/detail/0');

    fireEvent.click(toDoItem);

    expect(header.textContent).toBe('Todo In Detail');
    expect(url.textContent).toBe('/detail/0');
    const goBackButton = screen.getByText('Go Back...');
    expect(goBackButton).toBeInTheDocument();
    const toDoText = screen.getByText(sampleData[0]);
    expect(toDoText).toBeInTheDocument();
    const input = screen.getByText('Delete');
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    fireEvent.click(goBackButton);
    expect(header.textContent).toBe('Todo List');
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });

  it('deletes a todo in Detail page and comes back to List page', () => {
    const sampleData = ['Todo 1'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));
    renderWithMemoryRouter();

    let toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childNodes.length).toBe(1);

    const header = screen.getByText('Todo List');

    const toDoItem = screen.getByText(sampleData[0]);
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem);

    expect(header.textContent).toBe('Todo In Detail');
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(header.textContent).toBe('Todo List');
    expect(toDoItem).not.toBeInTheDocument();
    toDoList = screen.getByTestId('toDoList'); // testId로 조회한 ToDoList 컴포넌트의 렌더링 갱신
    expect(toDoList.childNodes.length).toBe(0);
    expect(localStorage.getItem('ToDoList')).toBe('[]');
  });

  it('shows NotFound page when user enters undefined URL and can go back to List page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };
    const { container } = renderWithMemoryRouter(
      { initialIndex: 1, initialEntries: ['/', '/not_found'] },
      <TestComponent />,
    );

    const url = screen.getByText('/not_found');

    const header = screen.getByText('Error');
    expect(header).toBeInTheDocument();
    const goBackButton = screen.getByText('Go Back...');
    expect(goBackButton).toBeInTheDocument();
    const notFoundText = screen.getByText('Page Not Found 😱');
    expect(notFoundText).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    fireEvent.click(goBackButton);

    expect(url.textContent).toBe('/');
    expect(header.textContent).toBe('Todo List');
  });
});
