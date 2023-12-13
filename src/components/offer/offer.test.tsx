import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../const';
import {
  makeFakeOffer,
  makeFakeOffersPreview,
  makeFakeReviews,
} from '../../utils';
import { Offer } from '..';
import { withStoreAndHistory } from '../../utils/mock-component';

describe('Component <Offer />:', () => {
  it('should render correctly. Do not show the <ReviewForm />, because by default the user has the status "Unknown"', () => {
    const fakeOffer = makeFakeOffer();
    const commentsCount = 12;
    const fakeComments = makeFakeReviews({ length: commentsCount });
    const fakeOffersPreview = makeFakeOffersPreview();
    const unexpectedFormTitleText = 'Your review';
    const EXPECTED_OFFER_TEST_ID = {
      CONTAINER: 'offer-container',
      TITLE: 'offer-title',
      BOOKMARK: 'offer-bookmark',
      RATING: 'starline-container',
      FEATURES: 'features-container',
      PRICE: 'price-container',
      INSIDE: 'inside-container',
      HOST: 'host-title',
      HOST_IMG: 'host-image',
      HOST_NAME: 'host-name',
      DESCRIPTION: 'offer-description',
      COMMENTS: 'comments-container',
    };
    const { withStoreComponent: offerWrappedComponent } = withStoreAndHistory(
      <Offer
        offer={fakeOffer}
        authStatus={AuthorizationStatus.Unknown}
        offers={fakeOffersPreview}
        reviews={fakeComments}
        numberReviews={commentsCount}
      />
    );

    render(offerWrappedComponent);

    const RESULT_LIST = {
      CONTAINER: screen.getByTestId(EXPECTED_OFFER_TEST_ID.CONTAINER),
      TITLE: screen.getByTestId(EXPECTED_OFFER_TEST_ID.TITLE),
      BOOKMARK: screen.getByTestId(EXPECTED_OFFER_TEST_ID.BOOKMARK),
      RATING: screen.getAllByTestId(EXPECTED_OFFER_TEST_ID.RATING),
      FEATURES: screen.getByTestId(EXPECTED_OFFER_TEST_ID.FEATURES),
      PRICE: screen.getByTestId(EXPECTED_OFFER_TEST_ID.PRICE),
      INSIDE: screen.getByTestId(EXPECTED_OFFER_TEST_ID.INSIDE),
      HOST: screen.getByTestId(EXPECTED_OFFER_TEST_ID.HOST),
      HOST_IMG: screen.getByTestId(EXPECTED_OFFER_TEST_ID.HOST_IMG),
      HOST_NAME: screen.getByTestId(EXPECTED_OFFER_TEST_ID.HOST_NAME),
      DESCRIPTION: screen.getByTestId(EXPECTED_OFFER_TEST_ID.DESCRIPTION),
      COMMENTS: screen.getByTestId(EXPECTED_OFFER_TEST_ID.COMMENTS),
    };

    expect(RESULT_LIST.CONTAINER).toBeInTheDocument();
    expect(RESULT_LIST.TITLE).toBeInTheDocument();
    expect(RESULT_LIST.BOOKMARK).toBeInTheDocument();
    expect(RESULT_LIST.FEATURES).toBeInTheDocument();
    expect(RESULT_LIST.PRICE).toBeInTheDocument();
    expect(RESULT_LIST.INSIDE).toBeInTheDocument();
    expect(RESULT_LIST.HOST).toBeInTheDocument();
    expect(RESULT_LIST.HOST_IMG).toBeInTheDocument();
    expect(RESULT_LIST.HOST_NAME).toBeInTheDocument();
    expect(RESULT_LIST.DESCRIPTION).toBeInTheDocument();
    expect(RESULT_LIST.COMMENTS).toBeInTheDocument();
    expect(RESULT_LIST.RATING).toBeTruthy();
    expect(screen.queryByText(unexpectedFormTitleText)).not.toBeInTheDocument();
  });

  it('should render correctly. Show the <ReviewForm />, because the user has the status "Auth"', () => {
    const fakeOffer = makeFakeOffer();
    const commentsCount = 12;
    const fakeComments = makeFakeReviews({ length: commentsCount });
    const fakeOffersPreview = makeFakeOffersPreview();
    const expectedFormTitleText = 'Your review';
    const { withStoreComponent: offerWrappedComponent } = withStoreAndHistory(
      <Offer
        offer={fakeOffer}
        authStatus={AuthorizationStatus.Auth}
        offers={fakeOffersPreview}
        reviews={fakeComments}
        numberReviews={commentsCount}
      />
    );

    render(offerWrappedComponent);

    expect(screen.getByText(expectedFormTitleText)).toBeInTheDocument();
  });
});
