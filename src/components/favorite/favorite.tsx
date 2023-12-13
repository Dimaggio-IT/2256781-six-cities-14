import { Link } from 'react-router-dom';
import { AppRoute, TYPE_CARD } from '../../const';
import { getOffersByCity } from '../../utils';
import { useAppSelector } from '../../hooks';
import { selectCitiesFromFavoritesMemo, selectFavorites } from '../../store';
import { Card } from '..';

function Favorite(): JSX.Element {
  const cities = useAppSelector(selectCitiesFromFavoritesMemo);
  const favorites = useAppSelector(selectFavorites);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites" data-testid="favorite-container">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list" data-testid="favorite-list">
            {cities.map((city) => (
              <li
                key={city}
                className="favorites__locations-items"
                data-testid="favorites-item"
              >
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {getOffersByCity(favorites, city).map((offer) => (
                    <Card
                      key={offer.id}
                      offer={offer}
                      type={TYPE_CARD.FAVORITES}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export { Favorite };
