import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from './AuthForm';
import '@testing-library/jest-dom';

/**
 * test scenario
 *
 * - AuthForm Component
 *  - should handle typing name correctly
 *  - should handle typing email correctly
 *  - should handle typing password correctly
 *
 */

describe('AuthForm input component', () => {
  it('should handle typing name correctly', async () => {
    // arrange
    render(<AuthForm type="SIGNUP" onSubmit={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Name');
    // action
    await userEvent.type(nameInput, 'John Doe');
    // assert
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle typing email correctly', async () => {
    // arrange
    render(<AuthForm type="SIGNIN" onSubmit={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');
    // action
    await userEvent.type(emailInput, 'email@domain.com');
    // assert
    expect(emailInput).toHaveValue('email@domain.com');
  });

  it('should handle typing password correctly', async () => {
    // arrange
    render(<AuthForm type="SIGNIN" onSubmit={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');
    // action
    await userEvent.type(passwordInput, 'secretKey');
    // assert
    expect(passwordInput).toHaveValue('secretKey');
  });
});
