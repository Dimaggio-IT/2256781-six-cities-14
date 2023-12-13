import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router/history-router';
import { store } from '../../store';
import { Footer } from '..';

const history = createMemoryHistory();

describe('Component: footer', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Footer />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('footer-container')).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
