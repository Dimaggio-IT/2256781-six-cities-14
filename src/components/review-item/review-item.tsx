import { COMMENT_DATE, COMMENT_DATE_TIME, StarType } from '../../const';
import { TReview } from '../../types';
import { formatDate } from '../../utils/common';
import { StarLine } from '..';

type TReviewItemProps = {
  review: TReview;
};
export function ReviewItem({ review }: TReviewItemProps): JSX.Element {
  const { rating, user, comment, date } = review;
  const { avatarUrl, name } = user;
  const timeFormatted = formatDate(date, COMMENT_DATE);
  const dateTimeFormatted = formatDate(date, COMMENT_DATE_TIME);

  return (
    <li className="reviews__item" data-testid="review-item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <StarLine rating={rating} type={StarType.Review} />
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={dateTimeFormatted}>
          {timeFormatted}
        </time>
      </div>
    </li>
  );
}
