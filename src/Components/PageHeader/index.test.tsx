import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';

import { PageHeader } from './index';
import { renderWithRouter } from 'Libs/utils';

describe('<PageHeader />', () => {
  it('renders component correctly', () => {
    const route = '/';
    const { container } = renderWithRouter(<PageHeader />, { route });

    const label = screen.getByText('Todo List');
    expect(label).toBeInTheDocument();
    const goBack = screen.queryByText('Go Back...');
    expect(goBack).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  describe('determines to show title text and go back button by pathname', () => {
    it('in root page', () => {
      const route = '/';
      renderWithRouter(<PageHeader />, { route });
      const label = screen.getByText('Todo List');
      expect(label).toBeInTheDocument();
      const goBack = screen.queryByText('Go Back...');
      expect(goBack).not.toBeInTheDocument();
    });

    it('in add page', () => {
      const route = '/add';
      renderWithRouter(<PageHeader />, { route });
      const label = screen.getByText('Add Todo');
      expect(label).toBeInTheDocument();
      const goBack = screen.queryByText('Go Back...');
      expect(goBack).toBeInTheDocument();
      expect(goBack?.getAttribute('href')).toBe('/');
    });

    it('in detail page', () => {
      const route = '/detail/0';
      expect(route.startsWith('/detail')).toBeTruthy();
      renderWithRouter(<PageHeader />, { route });
      const label = screen.getByText('Todo In Detail');
      expect(label).toBeInTheDocument();
      const goBack = screen.queryByText('Go Back...');
      expect(goBack).toBeInTheDocument();
      expect(goBack?.getAttribute('href')).toBe('/');
    });

    it('in page not defined ', () => {
      const route = '/not_found_test';
      expect(route.startsWith('/detail')).not.toBeTruthy();
      renderWithRouter(<PageHeader />, { route });
      const label = screen.getByText('Error');
      expect(label).toBeInTheDocument();
      const goBack = screen.queryByText('Go Back...');
      expect(goBack).toBeInTheDocument();
      expect(goBack?.getAttribute('href')).toBe('/');
    });
  });

  it('renders component correctly with goBack link', () => {
    const route = '/not_found_test';
    renderWithRouter(<PageHeader />, { route });
    const goBack = screen.getByText('Go Back...');
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);

    const label = screen.getByText('Todo List');
    expect(label).toBeInTheDocument();
    expect(goBack).not.toBeInTheDocument();
  });
});
