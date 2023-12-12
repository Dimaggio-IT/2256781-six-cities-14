import { LazyLoadImage } from 'react-lazy-load-image-component';
import { OFFER_GALLERY_QUANTITY } from '../../../const';
import { TOffer } from '../../../types';
import 'react-lazy-load-image-component/src/effects/blur.css';

type TOfferGalleryProps = {
  offer: TOffer;
};

function OfferGallery({ offer }: TOfferGalleryProps): JSX.Element {
  const { title, images } = offer;
  return (
    <div className="offer__gallery" data-testid="gallery-container">
      {images
        .filter((_, index) => index < OFFER_GALLERY_QUANTITY)
        .map((image) => (
          <div className="offer__image-wrapper" key={image} data-testid="offer-image-container">
            <LazyLoadImage
              className="offer__image"
              src={image}
              alt={title}
              effect="blur"
            />
          </div>
        ))}
    </div>
  );
}

export { OfferGallery };
