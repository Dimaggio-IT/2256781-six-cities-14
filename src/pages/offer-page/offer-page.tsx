import { Helmet } from 'react-helmet-async';
import { Header, Nearby, Offer } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { CSSProperties, useEffect } from 'react';
import {
  assignEmptyOffer,
  getAsyncFavorites,
  getAsyncNearbyPlaces,
  getAsyncOffer,
  getAsyncReviews,
  selectAuthStatus,
  selectNearbyPlaces,
  selectNumberReviews,
  selectOffer,
  selectReviews,
} from '../../store';
import { MAX_COUNT_NEARBY_PLACES } from '../../const';
import { Spinner } from '../../components/spinner/spinner';
import { TOfferPreview, TOffersPreview } from '../../types';

const override: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

function OfferPage(): JSX.Element {
  const { offerId } = useParams();
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(selectOffer);
  const authStatus = useAppSelector(selectAuthStatus);
  const nearbyPlaces = useAppSelector(selectNearbyPlaces)?.slice(
    0,
    MAX_COUNT_NEARBY_PLACES
  );
  const reviews = useAppSelector(selectReviews);
  const numberReviews = useAppSelector(selectNumberReviews);

  useEffect(() => {
    if (offerId) {
      dispatch(getAsyncOffer(offerId));
      dispatch(getAsyncNearbyPlaces(offerId));
      dispatch(getAsyncReviews(offerId));
      dispatch(getAsyncFavorites());
    }

    return () => {
      dispatch(assignEmptyOffer());
    };
  }, [offerId, dispatch]);

  if (!currentOffer) {
    return (
      <Spinner
        color="#4481c3"
        width={10}
        height={200}
        cssOverride={override}
        margin={10}
      />
    );
  }

  const { title, id } = currentOffer;
  const additional: TOfferPreview = currentOffer as unknown as TOfferPreview;
  const offersOnMap: TOffersPreview = [...nearbyPlaces];
  offersOnMap.push(additional);

  return (
    <div className="page">
      <Helmet>
        <title>{`6 Cities - Offer ${id}: ${title}`}</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer" data-testid="offer-page-container">
        <Offer
          offers={offersOnMap}
          offer={currentOffer}
          authStatus={authStatus}
          reviews={reviews}
          numberReviews={numberReviews}
        />
        <div className="container" data-testid="nearby-page-container">
          <Nearby offers={nearbyPlaces} />
        </div>
      </main>
    </div>
  );
}

export { OfferPage };
