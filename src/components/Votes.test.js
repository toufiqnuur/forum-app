import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Votes from './Votes';

/**
 * test scenario
 *
 * - Votes Component
 *  - should have className "text-blue-600" when isLike is true
 *  - should have className "text-red-600" when isDislike is true
 *
 */

describe('Votes component', () => {
  it('should have className "text-blue-600" when isLike is true', async () => {
    render(<Votes isLiked />);
    const likeButton = await screen.findByTestId('like-button');
    expect(likeButton.firstChild).toHaveClass('text-blue-600');
  });
  it('should have className "text-red-600" when isDislike is true', async () => {
    render(<Votes isDisliked />);
    const likeButton = await screen.findByTestId('dislike-button');
    expect(likeButton.firstChild).toHaveClass('text-red-600');
  });
});
