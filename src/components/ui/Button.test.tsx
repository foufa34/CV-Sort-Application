import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders Button with children', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
describe('Button component', () => {
  it('renders the button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
