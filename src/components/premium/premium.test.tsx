import { render, screen } from '@testing-library/react';
import { Premium } from '..';
import { MarkType } from '../../const';

describe('Component: <Premium />', () => {
  it('should render correctly', () => {
    render(<Premium isPremium mark={MarkType.Card} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render incorrectly', () => {
    const premiumContainerTestId = 'premium-container';

    render(<Premium isPremium={false} mark={MarkType.Card} />);

    const premiumContainer = screen.queryByTestId(premiumContainerTestId);

    expect(premiumContainer).toBeNull();
  });

  it('should contain the class Card', () => {
    const premiumContainerTestId = 'premium-container';
    const cardClass = 'place-card__mark';

    render(<Premium isPremium mark={MarkType.Card} />);

    const premiumContainer = screen.getByTestId(premiumContainerTestId);

    expect(premiumContainer).toHaveClass(cardClass);
  });

  it('should contain the class Offer', () => {
    const premiumContainerTestId = 'premium-container';
    const offerClass = 'offer__mark';

    render(<Premium isPremium mark={MarkType.Offer} />);

    const premiumContainer = screen.getByTestId(premiumContainerTestId);

    expect(premiumContainer).toHaveClass(offerClass);
  });
});
