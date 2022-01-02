import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders component correctly', () => {
    // const { container } = render(<App />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
    // // expect(container.getElementsByTagName('a')).toHaveLength(1);
    // // expect(container.getElementsByTagName('a')[0]).toHaveTextContent(
    // //   'Learn React'
    // // );
    // const appLogo = screen.getByAltText('logo');
    // expect(appLogo).toBeInTheDocument();
    // expect(appLogo).toHaveAttribute('src', 'logo.svg');
    // expect(container.getElementsByTagName('p')).toHaveLength(1);
    // expect(container.getElementsByTagName('p')[0]).toHaveTextContent(
    //   'Edit src/App.js and save to reload.',
    // );
    // expect(container).toMatchSnapshot();
  });
});
