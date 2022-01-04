import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { InputContainer } from './index';
import { ToDoListProvider } from 'Contexts';

describe('<InputContainer />', () => {
  it('renders component correclty', () => {
    const { container } = render(<InputContainer />);

    const input = screen.getByPlaceholderText('Enter what to do...');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('Add');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('clear data after adding data', () => {
    render(<InputContainer />);

    const input = screen.getByPlaceholderText('Enter what to do...') as HTMLInputElement;
    const button = screen.getByText('Add');

    expect(input.value).toBe('');
    const sampleInput = 'ToDo 1';
    fireEvent.change(input, { target: { value: sampleInput } });
    expect(input.value).toBe(sampleInput);
    fireEvent.click(button);
    expect(input.value).toBe('');
  });

  it('adds input data to localStorage via Context', () => {
    render(
      <ToDoListProvider>
        <InputContainer />
      </ToDoListProvider>,
    );

    const input = screen.getByPlaceholderText('Enter what to do...') as HTMLInputElement;
    const addButton = screen.getByText('Add');
    const sampleInput = 'New ToDo';

    expect(localStorage.getItem('ToDoList')).toBeNull();
    fireEvent.change(input, { target: { value: sampleInput } });
    fireEvent.click(addButton);
    // expect(localStorage.getItem('ToDoList')).toBe(`["${sampleInput}"]`); // 저장된 데이터 형태로 확인
    expect(JSON.parse(localStorage.getItem('ToDoList') as string).length).toBe(1); // 저장된 데이터 갯수로 확인
  });

  it('calls the onAdd function when the user clicks add button', () => {
    const handleClick = jest.fn();
    render(<InputContainer onAdd={handleClick} />);

    const input = screen.getByPlaceholderText('Enter what to do...');
    const button = screen.getByText('Add');
    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: 'ToDo 1' } });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
