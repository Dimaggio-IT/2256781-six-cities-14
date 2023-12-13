import { render, screen } from '@testing-library/react';
import { makeFakeOffersPreview } from '../../../utils';
import { withStoreAndHistory } from '../../../utils/mock-component';
import { OfferList } from './offer-list';

describe('Component <OffersList />:', () => {
  it('should render correct', () => {
    const fakeOffersPreview = makeFakeOffersPreview();
    const expectedCount = fakeOffersPreview.length;
    const handleCardHover = vi.fn();
    const handleCardLeave = vi.fn();
    const cardContainerTestId = 'card-container';
    const { withStoreComponent: wrappedOfferList } = withStoreAndHistory(
      <OfferList
        offers={fakeOffersPreview}
        onCardHover={handleCardHover}
        onCardLeave={handleCardLeave}
      />
    );

    render(wrappedOfferList);
    const cards = screen.getAllByTestId(cardContainerTestId);

    expect(cards.at(0)).toBeInTheDocument();
    expect(cards.at(cards.length - 1)).toBeInTheDocument();
    expect(cards.length).toBe(expectedCount);
  });
});
