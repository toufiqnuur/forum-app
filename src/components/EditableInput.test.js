import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableInput from './EditableInput';

/**
 * test scenario
 *
 * - Editable Component
 *  - should be disabled when contentEditable is false
 *  - should handle typing correctly
 *
 */

describe('EditableInput component', () => {
  it('should be disabled when contentEditable is false', () => {
    render(<EditableInput onChange={() => {}} disabled />);
    const editableInput = screen.getByTestId('test-editableInput');
    expect(editableInput).toHaveAttribute('contentEditable', 'false');
  });
  it('should handle typing correctly', async () => {
    render(<EditableInput onChange={() => {}} />);
    const editableInput = screen.getByTestId('test-editableInput');
    await userEvent.type(editableInput, 'test');
    expect(editableInput).toHaveTextContent('test');
  });
});
