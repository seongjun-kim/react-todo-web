import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoItem } from './index';
import { useLocation } from 'react-router-dom';
import { renderWithRouter } from 'Libs/utils';

describe('<ToDoItem />', () => {
  it('renders component correctly', () => {
    const { container } = renderWithRouter(<ToDoItem id={0} label="default value" />, {
      route: '/',
    });
    const toDoItem = screen.getByText('default value');
    expect(toDoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('clicks the delete button', () => {
    const handleClick = jest.fn();
    renderWithRouter(<ToDoItem id={0} label="default value" onDelete={handleClick} />, {
      route: '/',
    });
    const deleteButton = screen.getByText('Delete');
    expect(handleClick).toBeCalledTimes(0);
    fireEvent.click(deleteButton);
    expect(handleClick).toBeCalledTimes(1);
  });

  it('clicks the link to detail page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return (
        <div>
          <div>{pathname}</div>
          <ToDoItem id={0} label="default value" />
        </div>
      );
    };

    renderWithRouter(<TestComponent />, { route: '/' });
    const pathName = screen.getByText('/');
    expect(pathName).toBeInTheDocument();

    const toDoItem = screen.getByText('default value');
    fireEvent.click(toDoItem);
    expect(pathName.textContent).toBe('/detail/0');
  });
});
