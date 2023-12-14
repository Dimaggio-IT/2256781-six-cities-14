import { render, screen } from '@testing-library/react';
import { OfferGallery } from './offer-gallery';
import { makeFakeOffer } from '../../../utils';

describe('Component <OfferGallery />:', () => {
  it('should render correctly if no images are received', () => {
    const fakeOffer = makeFakeOffer();
    fakeOffer.images = [];
    const galleryContainerTestId = 'gallery-container';
    const component = <OfferGallery offer={fakeOffer} />;

    render(component);

    const expectedGalleryContainer = screen.getByTestId(galleryContainerTestId);
    expect(expectedGalleryContainer).toBeInTheDocument();
  });

  it('should render correctly if images are received', () => {
    const fakeOffer = makeFakeOffer();
    const expectedImageCount = fakeOffer.images.length;
    const imageContainerTestId = 'offer-image-container';
    const component = <OfferGallery offer={fakeOffer} />;

    render(component);

    const imageElements = screen.getAllByTestId(imageContainerTestId);

    expect(imageElements.length).toBe(expectedImageCount);
  });
});
