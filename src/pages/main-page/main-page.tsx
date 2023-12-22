import { Helmet } from 'react-helmet-async';
import { Header, CityLine, Map, OfferBoard } from '../../components';
import { MapType } from '../../const';
import { TOfferPreview } from '../../types';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Spinner } from '../../components/spinner/spinner';
import cn from 'classnames';
import { NotFoundPlaces } from '..';
import {
  getAsyncFavorites,
  getAsyncOffers,
  selectCity,
  selectIsEmptyOffers,
  selectIsOffersLoading,
  selectOffersMemo,
} from '../../store';

const override: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

function MainPage(): JSX.Element {
  const [activeCard, setActiveCard] = useState<TOfferPreview | null>(null);
  const offersToRender = useAppSelector(selectOffersMemo);
  const isOffersLoading = useAppSelector(selectIsOffersLoading);
  const activeCity = useAppSelector(selectCity);
  const isEmptyOffers = useAppSelector(selectIsEmptyOffers);
  const isEmptyOffersByCity = !offersToRender.length;
  const isEmpty = isEmptyOffers || isEmptyOffersByCity;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAsyncOffers());
    dispatch(getAsyncFavorites());
  }, [dispatch]);

  const handleCardHover = useCallback(
    (offer: TOfferPreview) => setActiveCard(offer),
    []
  );
  const handleCardLeave = useCallback(() => setActiveCard(null), []);

  return (
    <div className="page page--gray page--main" data-testid="main-page">
      <Helmet>
        <title>6 Cities - Main page</title>
      </Helmet>

      <Header />

      <main
        className={cn('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <CityLine />
        {isOffersLoading && (
          <Spinner
            color="#4481c3"
            width={10}
            height={200}
            cssOverride={override}
            margin={10}
          />
        )}
        {!isOffersLoading && (
          <div className="cities" data-testid="cities-container">
            <div
              className={cn('cities__places-container', 'container', {
                'cities__places-container--empty': isEmpty,
              })}
            >
              {isEmpty && <NotFoundPlaces city={activeCity} />}
              {!isEmpty && (
                <>
                  <OfferBoard
                    cityName={activeCity}
                    offers={offersToRender}
                    onCardHover={handleCardHover}
                    onCardLeave={handleCardLeave}
                  />
                  <div
                    className="cities__right-section"
                    data-testid="map-container"
                  >
                    <Map
                      type={MapType.City}
                      offers={offersToRender}
                      activeOffer={activeCard}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export { MainPage };
