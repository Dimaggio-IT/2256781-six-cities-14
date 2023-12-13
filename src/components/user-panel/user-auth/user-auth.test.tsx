import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import { UserAuth } from './user-auth';

describe('Component <UserAuth />:', () => {
  it('should render correct', () => {
    const countFavorite = 3;
    const navContainerId = 'nav-container';
    const favoriteContainerId = 'count-favorites';
    const component = withHistory(
      <UserAuth
        onSignOut={() => {}}
        quantityFavorite={countFavorite}
        userData={null}
      />
    );

    render(component);

    const navContainer = screen.getByTestId(navContainerId);
    const favoriteContainer = screen.getByTestId(favoriteContainerId);

    expect(navContainer).toBeInTheDocument();
    expect(Number(favoriteContainer.textContent)).toEqual(countFavorite);
  });
});
