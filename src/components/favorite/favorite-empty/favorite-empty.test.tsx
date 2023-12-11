import { render, screen } from '@testing-library/react';
import { FavoriteEmpty } from './favorite-empty';

describe('Component: FavoriteEmpty', () => {
  it('Should render correctly', () => {
    render(<FavoriteEmpty />);
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
