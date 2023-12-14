import { render, screen } from '@testing-library/react';
import { UserPanel } from '..';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeState, makeFakeUserData } from '../../utils';
import { AuthorizationStatus, NameSpace } from '../../const';

describe('Component <UserPanel />', () => {
  const userPanelWithHistory = withHistory(<UserPanel />);

  it('should render correctly when the user is not authorized', () => {
    const initialState = makeFakeState();
    const { withStoreComponent } = withStore(
      userPanelWithHistory,
      initialState
    );
    const expectedText = 'Sign in';

    render(withStoreComponent);
    const sighInText = screen.getByText(expectedText);

    expect(sighInText).toBeInTheDocument();
  });

  it('should render correctly when the user is authorized', () => {
    const fakeUser = makeFakeUserData();
    const initialMockState = makeFakeState({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
      },
    });
    const { withStoreComponent } = withStore(
      userPanelWithHistory,
      initialMockState
    );
    const expectedText = 'Sign out';

    render(withStoreComponent);
    const signOutElement = screen.getByText(expectedText);
    const userEmailElement = screen.getByText(fakeUser.email);

    expect(signOutElement).toBeInTheDocument();
    expect(userEmailElement).toBeInTheDocument();
  });
});
