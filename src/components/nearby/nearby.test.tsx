import { render } from '@testing-library/react';
import { makeFakeOffersPreview } from '../../utils';
import { withStoreAndHistory } from '../../utils/mock-component';
import { Nearby } from '..';

describe('Component <Nearby />:', () => {
  it('should render correctly', () => {
    const nearPlacesContainerTestId = 'nearPlaces-container';
    const nearPlacesTitleTestId = 'nearPlaces-title';
    const expectedTitleText = 'Other places in the neighbourhood';
    const expectedCardsCount = 4;
    const fakeOffersPreview = makeFakeOffersPreview({
      length: expectedCardsCount,
    });
    const cardContainerTestId = 'card-container';
    const { withStoreComponent: wrappedNearbyComponent } = withStoreAndHistory(
      <Nearby offers={fakeOffersPreview} />
    );

    const { getAllByTestId, getByTestId } = render(wrappedNearbyComponent);

    const nearPlacesContainer = getByTestId(nearPlacesContainerTestId);
    const nearPlacesTitle = getByTestId(nearPlacesTitleTestId);
    const cardContainerItems = getAllByTestId(cardContainerTestId);

    expect(nearPlacesContainer).toBeInTheDocument();
    expect(nearPlacesTitle).toBeInTheDocument();
    expect(nearPlacesTitle.textContent).toEqual(expectedTitleText);
    expect(cardContainerItems.length).toEqual(expectedCardsCount);
  });
});
