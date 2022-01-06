import React from 'react';
import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { renderWithMemoryRouter } from 'Libs/utils';

describe('<NotFound />', () => {
  it('renders component correctly', () => {
    const { container } = renderWithMemoryRouter({ initialEntries: ['/not_found'] });

    const message = screen.getByText('Page Not Found 😱');
    expect(message).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
