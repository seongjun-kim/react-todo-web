import React from 'react';
import { Router, useLocation } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Add } from './index';
import { renderWithRouter } from 'Libs/utils';
import { ToDoListProvider } from 'Contexts';

describe('<Add />', () => {
  it('renders component correctly', () => {
    const { container } = renderWithRouter(<Add />, { route: '/' });

    const input = screen.getByPlaceholderText('Enter what to do...');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('Add');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('redirects to the root page after adding a new ToDo', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <ToDoListProvider>
          <div>{pathname}</div>
          <Add />
        </ToDoListProvider>
      );
    };
    renderWithRouter(<TestComponent />, { route: '/add' });

    const pathName = screen.getByText('/add');
    expect(pathName).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter what to do...');
    const button = screen.getByText('Add');
    const sampleData = ['New ToDo'];

    fireEvent.change(input, { target: { value: sampleData[0] } });
    fireEvent.click(button);

    expect(pathName.textContent).toBe('/');
    expect(localStorage.getItem('ToDoList')).toBe(JSON.stringify(sampleData));
  });
});
