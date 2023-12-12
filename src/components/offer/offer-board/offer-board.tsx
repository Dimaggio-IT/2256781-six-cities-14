import { memo, useCallback, useState } from 'react';
import { OfferList, Sorting } from '../..';
import {
  TCityName,
  TOfferPreview,
  TOffersPreview,
  TSorting,
} from '../../../types';
import { sorting } from '../../../utils';

type TOfferBoardProps = {
  offers: TOffersPreview;
  cityName: TCityName;
  onCardHover?(offer: TOfferPreview): void;
  onCardLeave?(): void;
};

const OfferListMemo = memo(OfferList);

function OfferBoard({
  offers,
  cityName,
  onCardHover,
  onCardLeave,
}: TOfferBoardProps): JSX.Element {
  const [activeSorting, setActiveSorting] = useState<TSorting>('POPULAR');
  const offerCount = offers.length;

  const handleSortingChange = useCallback((type: TSorting) => {
    setActiveSorting(type);
  }, []);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found" data-testid="place-found">
        {offerCount} place{offerCount > 1 && 's'} to stay in {cityName}
      </b>
      <Sorting
        activeSorting={activeSorting}
        onChange={handleSortingChange}
      />
      <OfferListMemo
        onCardHover={onCardHover}
        onCardLeave={onCardLeave}
        offers={sorting[activeSorting](offers)}
      />
    </section>
  );
}

export { OfferBoard };
