import { render } from '@testing-library/react';
import { Header } from '..';
import { withStoreAndHistory } from '../../utils/mock-component';

describe('Component: <Header />', () => {
  it('should render correctly', () => {
    const HEADER_TEST_ID = {
      CONTAINER: 'header-container',
      LOGO: 'header-link',
      USER: 'login-container',
    };
    const { withStoreComponent: wrappedHeader } = withStoreAndHistory(
      <Header />
    );

    const { getByTestId } = render(wrappedHeader);

    const RESULT_LIST = {
      CONTAINER: getByTestId(HEADER_TEST_ID.CONTAINER),
      LOGO: getByTestId(HEADER_TEST_ID.LOGO),
      USER: getByTestId(HEADER_TEST_ID.USER),
    };

    expect(RESULT_LIST.CONTAINER).toBeInTheDocument();
    expect(RESULT_LIST.LOGO).toBeInTheDocument();
    expect(RESULT_LIST.USER).toBeInTheDocument();
  });
});
