import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoItem } from './index';

describe('<ToDoItem />', () => {
  it('renders component correctly', () => {
    const { container } = render(<ToDoItem id={0} label="default value" />);
    const toDoItem = screen.getByText('default value');
    expect(toDoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('clicks the delete button', () => {
    const handleClick = jest.fn();
    render(<ToDoItem id={0} label="default value" onDelete={handleClick} />);
    const deleteButton = screen.getByText('Delete');
    expect(handleClick).toBeCalledTimes(0);
    fireEvent.click(deleteButton);
    expect(handleClick).toBeCalledTimes(1);
  });
});
