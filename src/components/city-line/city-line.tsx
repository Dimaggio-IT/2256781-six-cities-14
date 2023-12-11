import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { assignCity, selectCity } from '../../store';

function CityLine(): JSX.Element {
  const activeCity = useAppSelector(selectCity);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs" data-testid="tabs-container">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map((item) => (
              <li className="locations__item" key={item.city} data-testid="city-tab">
                <Link
                  className={cn('locations__item-link tabs__item', {
                    'tabs__item--active': item.city === activeCity,
                  })}
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(assignCity(item.city));
                  }}
                  to={AppRoute.Main}
                >
                  <span>{item.city}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export { CityLine };
