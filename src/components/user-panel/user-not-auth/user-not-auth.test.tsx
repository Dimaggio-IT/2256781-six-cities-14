import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import { UserNotAuth } from './user-not-auth';

describe('Component <UserNotAuth />:', () => {
  it('should render correct', () => {
    const loginContainerId = 'login-container';
    const expectedLoginContainerText = 'Sign in';
    const component = withHistory(<UserNotAuth />);

    render(component);

    const loginContainer = screen.getByTestId(loginContainerId);

    expect(loginContainer).toBeInTheDocument();
    expect(loginContainer.textContent).toEqual(expectedLoginContainerText);
  });
});
