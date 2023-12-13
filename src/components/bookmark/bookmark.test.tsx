import { render, fireEvent } from '@testing-library/react';
import { Bookmark } from '..';

describe('Component: <Bookmark />', () => {
  it('should renders correctly with default props', () => {
    const { getByText, getByTestId } = render(
      <Bookmark
        actionClass="action-class"
        imageClass="image-class"
        hiddenDescription="Hidden description"
      />
    );

    const button = getByTestId('offer-bookmark');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('action-class');

    const svg = getByTestId('offer-bookmark-icon');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('image-class');
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '19');

    const hiddenDescription = getByText('Hidden description');
    expect(hiddenDescription).toBeInTheDocument();
    expect(hiddenDescription).toHaveClass('visually-hidden');
  });

  it('calls onMarkChange when button is clicked', () => {
    const onMarkChange = vi.fn();
    const { getByTestId } = render(
      <Bookmark
        actionClass="action-class"
        imageClass="image-class"
        hiddenDescription="Hidden description"
        onMarkChange={onMarkChange}
      />
    );

    const button = getByTestId('offer-bookmark');
    fireEvent.click(button);

    expect(onMarkChange).toHaveBeenCalledTimes(1);
  });
});
