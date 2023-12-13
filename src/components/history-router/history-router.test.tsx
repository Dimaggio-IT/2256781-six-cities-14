import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from './history-router';

describe('Component <HistoryRouter />', () => {
  it('should render correct', () => {
    const route = '/';
    const expectedText = /Test HistoryRouter/i;
    const testComponent = <div>Test HistoryRouter</div>;
    const mockHistory = createMemoryHistory();
    const component = (
      <HistoryRouter history={mockHistory} basename={route}>
        {testComponent}
      </HistoryRouter>
    );

    render(component);

    const expectElem = screen.getByText(expectedText);

    expect(expectElem).toBeInTheDocument();
  });
});
