import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Container from './Container';

/**
 * test scenario
 *
 * - Container Component
 *  - should be empty dom when no child defined
 *  - should be have child when it's defined
 *
 */

describe('Container component', () => {
  it('should be empty dom when no child defined', () => {
    render(<Container />);
    const container = screen.getByTestId('container-test');
    expect(container).toBeEmptyDOMElement();
  });
  it('should be have child when it is defined', () => {
    render(
      <Container>
        <p>test</p>
      </Container>
    );
    const container = screen.getByTestId('container-test');
    expect(container).toContainHTML('<p>test</p>');
  });
});
