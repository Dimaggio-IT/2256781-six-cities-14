import { render, screen } from '@testing-library/react';
import { Map } from '..';
import { makeFakeOfferPreview } from '../../utils/mock';
import { withHistory } from '../../utils/mock-component';

describe('Component <Map />:', () => {
  it('should render correct', () => {
    const fakeOfferPreviewOne = makeFakeOfferPreview();
    const fakeOfferPreviewTwo = makeFakeOfferPreview();
    const fakeOffers = [fakeOfferPreviewOne, fakeOfferPreviewTwo];
    const mapContainerId = 'map-section';
    const component = withHistory(
      <Map offers={fakeOffers} activeOffer={fakeOfferPreviewOne} />
    );

    render(component);
    const mapContainer = screen.getByTestId(mapContainerId);

    expect(mapContainer).toBeInTheDocument();
  });
});
