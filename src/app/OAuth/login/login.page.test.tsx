import {render, screen, fireEvent} from "@testing-library/react";
import LoginPage from "./page";


describe("Login Page", () => {
    it("allow the user to log in with credencials", () => {

        // render the page
        render(<LoginPage />);

        // check if inputs are displayed
        const emailInput : HTMLInputElement = screen.getByLabelText('Email');
        const passwordInput : HTMLInputElement = screen.getByLabelText('Password');

        // fill the form
        fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // checks if send button is displayed
        const loginBtn: HTMLButtonElement = screen.getByRole('button', { name: 'Login' });


        expect(loginBtn).toBeInTheDocument();
        expect(emailInput.value).toBe('testuser@example.com');
        expect(passwordInput.value).toBe('password123');
    });
});


/* login.page.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/login';

describe('Login Page', () => {
    it('allows user to fill and submit the login form', () => {
        // Arrange: Render the Login page
        render(<LoginPage />);

        // Act: Simulate user input
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Assert: Check if form inputs are filled
        expect(emailInput.value).toBe('testuser@example.com');
        expect(passwordInput.value).toBe('password123');

        // Act: Submit the form
        const submitButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(submitButton);

        // Assert: Check if form submission is successful
        // You might want to check for a success message or a navigation to a new page
        // For simplicity, let's assume there's a success message on the same page
        const successMessage = screen.getByText('Login successful!');
        expect(successMessage).toBeInTheDocument();
    });
}); */