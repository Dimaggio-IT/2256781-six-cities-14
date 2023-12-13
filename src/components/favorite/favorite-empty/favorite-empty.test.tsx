import { render, screen } from '@testing-library/react';
import { FavoriteEmpty } from './favorite-empty';

describe('Component: FavoriteEmpty', () => {
  it('should render correctly', () => {
    render(<FavoriteEmpty />);
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
