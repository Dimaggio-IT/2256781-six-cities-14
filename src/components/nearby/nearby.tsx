import { Card } from '..';
import { TYPE_CARD } from '../../const';
import { TOffersPreview } from '../../types';

type TNearbyProps = {
  offers: TOffersPreview;
};

function Nearby({ offers }: TNearbyProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title" data-testid="nearPlaces-title">
        Other places in the neighbourhood
      </h2>
      <div
        className="near-places__list places__list"
        data-testid="nearPlaces-container"
      >
        {offers.map((offer) => (
          <Card key={offer.id} offer={offer} type={TYPE_CARD.NEAR} />
        ))}
      </div>
    </section>
  );
}

export { Nearby };
