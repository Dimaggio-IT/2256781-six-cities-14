import { OfferList, Sort } from '..';
import { TCityName, TOfferPreview, TOffersPreview } from '../../types';

type TOfferBoardProps = {
  offers: TOffersPreview;
  cityName: TCityName;
  onCardHover?(offer: TOfferPreview): void;
  onCardLeave?(): void;
};

function OfferBoard({ offers, cityName, onCardHover, onCardLeave }: TOfferBoardProps): JSX.Element {
  const offerCount = offers.length;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offerCount} places to stay in {cityName}</b>
      <Sort />
      <OfferList onCardHover={onCardHover} onCardLeave={onCardLeave} offers={offers} />
    </section>
  );
}

export { OfferBoard };