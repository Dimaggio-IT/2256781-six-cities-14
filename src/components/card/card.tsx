import { Link } from 'react-router-dom';
import { TCustomizationCard, TOfferPreview } from '../../types';
import { AppRoute, TYPE_CARD, MarkType } from '../../const';
import { Bookmark, Premium, StarLine } from '..';
import { useAppSelector, useFavoritesMark } from '../../hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { selectIsAuthStatus } from '../../store';

type TCardProps = {
  offer: TOfferPreview;
  type?: TCustomizationCard;
  onCardHover?(offer: TOfferPreview): void;
  onCardLeave?(): void;
};

function Card({
  offer,
  type = TYPE_CARD.CITY,
  onCardHover,
  onCardLeave,
}: TCardProps): JSX.Element {
  const {
    id,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type: offerType,
    isFavorite,
  } = offer;
  const {
    className: cardClassName,
    width: cardWidth,
    height: cardHeight,
    mark,
  } = type;
  const {
    className: markClassName,
    classNameActive: markClassNameActive,
    image: markImage,
  } = mark;
  const { className: markImageClassName } = markImage;
  const hiddenBookmarkDescription = isFavorite
    ? 'In bookmarks'
    : 'To bookmarks';
  const isAuth = useAppSelector(selectIsAuthStatus);
  const bookmarkClass =
    isFavorite && isAuth ? markClassNameActive : markClassName;
  const path = `${AppRoute.Offer}${id}`;
  const handleFavoriteChange = useFavoritesMark(id, isFavorite);

  return (
    <article
      className={cardClassName}
      onMouseEnter={() => onCardHover?.(offer)}
      onMouseLeave={() => onCardLeave?.()}
      data-testid="card-container"
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={path}>
          <LazyLoadImage
            className="place-card__image"
            src={previewImage}
            width={cardWidth}
            height={cardHeight}
            alt={title}
            effect="blur"
            data-testid="card-lazy-image"
          />
        </Link>
      </div>

      <Premium isPremium={isPremium} mark={MarkType.Card} />

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price" data-testid="card-price-container">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark
            actionClass={bookmarkClass}
            imageClass={markImageClassName}
            hiddenDescription={hiddenBookmarkDescription}
            onMarkChange={handleFavoriteChange}
          />
        </div>

        <StarLine rating={rating} />

        <h2 className="place-card__name" data-testid="card-name-title">
          <Link to={path}>{title}</Link>
        </h2>

        <p className="place-card__type" data-testid="card-type-paragraph">{offerType}</p>
      </div>
    </article>
  );
}

export { Card };
