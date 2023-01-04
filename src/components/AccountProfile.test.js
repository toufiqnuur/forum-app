import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AccountProfile from './AccountProfile';

/**
 * test scenario
 *
 * - AccountProfile Component
 *  - should have alt image
 *
 */

describe('AccountProfile component', () => {
  it('should have alt image', () => {
    render(<AccountProfile avatar="#" size="MD" name="test" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveProperty('alt');
  });
});
