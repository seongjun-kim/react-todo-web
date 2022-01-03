import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import 'jest-styled-components';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    const input = screen.getByPlaceholderText('Enter what to do...');
    expect(input).toBeInTheDocument();
    const label = screen.getByText('Add');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('adds and deletes ToDo item', () => {
    render(<App />);

    // Add first ToDo item
    const input = screen.getByPlaceholderText('Enter what to do...');
    const addButton = screen.getByText('Add');
    fireEvent.change(input, { target: { value: '1st TODO ITEM' } });
    fireEvent.click(addButton);
    const firstToDoItem = screen.getByText('1st TODO ITEM');
    expect(firstToDoItem).toBeInTheDocument();
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(1);

    // Check delete button added in the first ToDO item
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();

    // Add second ToDo item
    fireEvent.change(input, { target: { value: '2nd TODO ITEM' } });
    fireEvent.click(addButton);
    const secondToDoItem = screen.getByText('2nd TODO ITEM');
    expect(secondToDoItem).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(2);

    // Delete the first ToDo item
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(firstToDoItem).not.toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(1);
  });

  it('does not add empty ToDo', () => {
    render(<App />);

    const toDoList = screen.getByTestId('toDoList');
    const length = toDoList.childElementCount;

    const button = screen.getByText('Add');
    fireEvent.click(button);

    expect(toDoList.childElementCount).toBe(length);
  });

  it('loads localStorage data', () => {
    const sampleData = ['ToDo 1', 'ToDo 2', 'ToDo 3'];
    localStorage.setItem('ToDoList', JSON.stringify(sampleData));

    render(<App />);

    expect(screen.getByText(sampleData[0])).toBeInTheDocument();
    expect(screen.getByText(sampleData[1])).toBeInTheDocument();
    expect(screen.getByText(sampleData[2])).toBeInTheDocument();
    expect(screen.getAllByText('Delete').length).toBe(3);
  });
});
