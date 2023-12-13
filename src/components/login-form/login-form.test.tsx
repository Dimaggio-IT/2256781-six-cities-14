import { render } from '@testing-library/react';
import { LoginForm } from '..';
import { withStore, withStoreAndHistory } from '../../utils/mock-component';
import userEvent from '@testing-library/user-event';

describe('Component <LoginForm />', () => {
  it('should render correctly', () => {
    const titleText = 'Sign in';
    const passwordText = 'Password';
    const emailText = 'E-mail';

    const { withStoreComponent: wrappedLoginForm } = withStoreAndHistory(
      <LoginForm />
    );

    const { getByText, getAllByText } = render(wrappedLoginForm);

    expect(getAllByText(titleText)).toBeTruthy();
    expect(getByText(passwordText)).toBeInTheDocument();
    expect(getByText(emailText)).toBeInTheDocument();
  });

  it('should render correctly when the user enters the login and password', async () => {
    const loginElementTestId = 'email-element';
    const passwordElementTestId = 'password-element';
    const expectedLoginValue = 'dimaggio';
    const expectedPasswordValue = '123456';
    const { withStoreComponent: loginFormWithStore } = withStore(<LoginForm />);

    const { getByTestId, getByDisplayValue } = render(loginFormWithStore);

    await userEvent.type(getByTestId(loginElementTestId), expectedLoginValue);
    await userEvent.type(getByTestId(passwordElementTestId), expectedPasswordValue);

    expect(getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
