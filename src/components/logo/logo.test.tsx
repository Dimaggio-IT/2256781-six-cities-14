import { render, screen } from '@testing-library/react';
import { Logo } from '..';
import { HistoryRouter } from '../history-router/history-router';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const logoWidth = 100;
    const logoHeight = 80;
    const logoLinkTestId = 'header-link';
    const imageTestId = 'logo-img';

    render(
      <HistoryRouter history={history}>
        <Logo width={logoWidth} height={logoHeight} />
      </HistoryRouter>
    );

    const logoLink = screen.getByTestId(logoLinkTestId);
    const image = screen.getByTestId(imageTestId);

    expect(logoLink).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('should render image with specified width and height values', () => {
    const logoWidth = 100;
    const logoHeight = 80;
    const imageTestId = 'logo-img';

    render(
      <HistoryRouter history={history}>
        <Logo width={logoWidth} height={logoHeight} />
      </HistoryRouter>
    );

    const image = screen.getByTestId(imageTestId);

    expect(image).toBeInTheDocument();
    expect(image.getAttribute('width')).toBe(String(logoWidth));
    expect(image.getAttribute('height')).toBe(String(logoHeight));
  });
});
