import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import Button from './Button';
test('renders Button with children', () => {
    render(_jsx(Button, { children: "Click me" }));
    expect(screen.getByText('Click me')).toBeInTheDocument();
});
describe('Button component', () => {
    it('renders the button with text', () => {
        render(_jsx(Button, { children: "Click me" }));
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
});
