import { render, screen } from '@testing-library/react';
import { makeFakeOffersPreview } from '../../../utils';
import { OfferBoard } from './offer-board';
import { TCityName } from '../../../types';
import { withStoreAndHistory } from '../../../utils/mock-component';

describe('Component: <OfferBoard />', () => {
  it('should render correct', () => {
    const fakeOffersPreview = makeFakeOffersPreview();
    const offersPreviewCount = fakeOffersPreview.length;
    const handleCardHover = vi.fn();
    const handleCardLeave = vi.fn();
    const expectedTitleText = 'Places';
    const cityName: TCityName = 'Paris';
    const boardPlaceFoundTestId = 'place-found';
    const expectedBoardPlaceText = `${offersPreviewCount} place${
      offersPreviewCount > 1 && 's'
    } to stay in ${cityName}`;
    const { withStoreComponent: wrappedOfferBoard } = withStoreAndHistory(
      <OfferBoard
        offers={fakeOffersPreview}
        cityName={cityName}
        onCardHover={handleCardHover}
        onCardLeave={handleCardLeave}
      />
    );

    render(wrappedOfferBoard);

    const boardTitle = screen.getByText(expectedTitleText);
    const boardPlaceFound = screen.getByTestId(boardPlaceFoundTestId);

    expect(boardTitle).toBeInTheDocument();
    expect(boardPlaceFound).toHaveTextContent(expectedBoardPlaceText);
  });
});
