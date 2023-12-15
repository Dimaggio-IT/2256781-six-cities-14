import { render } from '@testing-library/react';
import { AuthorizationStatus } from '../../const';
import { getRandomInteger, makeFakeOffer, makeFakeReviews } from '../../utils';
import { Review } from '..';
import { withStoreAndHistory } from '../../utils/mock-component';
import { TOffer, TOfferId, TReviews } from '../../types';

describe('Component <Review />:', () => {
  const REVIEW_TEST_DATA = {
    FORM: 'review-form-container',
    REVIEW_AMOUNT: 'review-amount',
    LIST_CONTAINER: 'review-list-container',
    REVIEW_ITEM: 'review-item',
    REVIEW_LABEL: 'Your review',
  };
  let fakeOffer: TOffer;
  let fakeOfferId: TOfferId;
  let commentsCount: number;
  let fakeComments: TReviews;

  beforeAll(() => {
    fakeOffer = makeFakeOffer();
    fakeOfferId = fakeOffer.id;
    commentsCount = getRandomInteger(1, 12);
    fakeComments = makeFakeReviews({ length: commentsCount });
  });

  it('should render correctly with default props and when the user is not authorized', () => {
    const authStatus = AuthorizationStatus.NoAuth;

    const { withStoreComponent: wrappedReviewComponent } = withStoreAndHistory(
      <Review
        reviews={fakeComments}
        offerId={fakeOfferId}
        authStatus={authStatus}
        numberReviews={commentsCount}
      />
    );

    const { getByTestId, getAllByTestId, queryByTestId, queryByLabelText } =
      render(wrappedReviewComponent);

    const RESULT_LIST = {
      FORM: queryByTestId(REVIEW_TEST_DATA.FORM),
      REVIEW_AMOUNT: getByTestId(REVIEW_TEST_DATA.REVIEW_AMOUNT),
      LIST_CONTAINER: getByTestId(REVIEW_TEST_DATA.LIST_CONTAINER),
      REVIEW_ITEM: getAllByTestId(REVIEW_TEST_DATA.REVIEW_ITEM),
      REVIEW_LABEL: queryByLabelText(REVIEW_TEST_DATA.REVIEW_LABEL),
    };

    expect(RESULT_LIST.FORM).not.toBeInTheDocument();
    expect(Number(RESULT_LIST.REVIEW_AMOUNT.textContent)).toEqual(
      commentsCount
    );
    expect(RESULT_LIST.LIST_CONTAINER).toBeInTheDocument();
    expect(RESULT_LIST.REVIEW_ITEM.length).toEqual(commentsCount);
    expect(RESULT_LIST.REVIEW_LABEL).not.toBeInTheDocument();
  });

  it('should render correctly when the user is authorized', () => {
    const authStatus = AuthorizationStatus.Auth;

    const { withStoreComponent: wrappedReviewComponent } = withStoreAndHistory(
      <Review
        reviews={fakeComments}
        offerId={fakeOfferId}
        authStatus={authStatus}
        numberReviews={commentsCount}
      />
    );

    const { getByTestId, getAllByTestId, getByLabelText } = render(
      wrappedReviewComponent
    );
    const RESULT_LIST = {
      FORM: getByTestId(REVIEW_TEST_DATA.FORM),
      REVIEW_AMOUNT: getByTestId(REVIEW_TEST_DATA.REVIEW_AMOUNT),
      LIST_CONTAINER: getByTestId(REVIEW_TEST_DATA.LIST_CONTAINER),
      REVIEW_ITEM: getAllByTestId(REVIEW_TEST_DATA.REVIEW_ITEM),
      REVIEW_LABEL: getByLabelText(REVIEW_TEST_DATA.REVIEW_LABEL),
    };

    expect(RESULT_LIST.FORM).toBeInTheDocument();
    expect(Number(RESULT_LIST.REVIEW_AMOUNT.textContent)).toEqual(
      commentsCount
    );
    expect(RESULT_LIST.LIST_CONTAINER).toBeInTheDocument();
    expect(RESULT_LIST.REVIEW_ITEM.length).toEqual(commentsCount);
    expect(RESULT_LIST.REVIEW_LABEL).toBeInTheDocument();
  });
});
