import { TOfferId, TReviews } from '../../types';
import { ReviewForm } from '../../components';
import { ReviewItem } from '../../components';
import { AuthorizationStatus } from '../../const';

type TReviewProps = {
  offerId: TOfferId;
  reviews: TReviews;
  authStatus: AuthorizationStatus;
  numberReviews: number;
};

function Review({
  reviews,
  offerId,
  authStatus,
  numberReviews,
}: TReviewProps): JSX.Element {
  return (
    <section className="offer__reviews reviews" data-testid="comments-container">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{numberReviews}</span>
      </h2>

      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      {authStatus === AuthorizationStatus.Auth && (
        <ReviewForm offerId={offerId} />
      )}
    </section>
  );
}

export { Review };
