import { OfferPage } from '../../pages';
import { NameSpace, RequestStatus } from '../../const';
import { withStoreAndHistory } from '../../utils/mock-component';
import {
  makeFakeNearbyPlacesPreview,
  makeFakeOffer,
  makeFakeReviews,
  makeFakeState,
} from '../../utils';
import { render } from '@testing-library/react';

describe('Component: <OfferPage />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render a loading spinner if there is no current offer', () => {
    const spinnerTestId = 'spinner-container';
    const initialState = {
      [NameSpace.Offer]: {
        isOfferLoading: false,
        offer: null,
        nearbyPlaces: [],
        reviews: [],
        reviewRequestStatus: RequestStatus.Idle,
      },
    };
    const { withStoreComponent: offerPageWrappedComponent } =
      withStoreAndHistory(<OfferPage />, makeFakeState(initialState));

    const { getByTestId } = render(offerPageWrappedComponent);

    const spinnerElement = getByTestId(spinnerTestId);
    expect(spinnerElement).toBeInTheDocument();
  });

  it('should render the offer and nearby places if there is a current offer', () => {
    const EXPECTED_ID = {
      OFFER_PAGE_CONTAINER: 'offer-page-container',
      NEARBY_OFFER_PAGE_CONTAINER: 'nearby-page-container',
      PLACE_CONTAINER: 'nearPlaces-container',
      OFFER_CONTAINER: 'offer-container',
      SPINNER_CONTAINER: 'spinner-container',
    };
    const fakeOffer = makeFakeOffer();
    const nearbyPlacesPreview = makeFakeNearbyPlacesPreview();
    const reviews = makeFakeReviews();
    const initialState = {
      [NameSpace.Offer]: {
        isOfferLoading: false,
        offer: fakeOffer,
        nearbyPlaces: nearbyPlacesPreview,
        reviews: reviews,
        reviewRequestStatus: RequestStatus.Success,
      },
    };
    const { withStoreComponent: offerPageWrappedComponent } =
      withStoreAndHistory(<OfferPage />, makeFakeState(initialState));

    const { getByTestId, queryByTestId } = render(offerPageWrappedComponent);

    const ElementList = {
      PageContainer: getByTestId(EXPECTED_ID.OFFER_PAGE_CONTAINER),
      NearbyContainer: getByTestId(EXPECTED_ID.NEARBY_OFFER_PAGE_CONTAINER),
      PlaceContainer: getByTestId(EXPECTED_ID.PLACE_CONTAINER),
      OfferContainer: getByTestId(EXPECTED_ID.OFFER_CONTAINER),
      SpinnerContainer: queryByTestId(EXPECTED_ID.SPINNER_CONTAINER),
    } as const;

    expect(ElementList.SpinnerContainer).toBeNull();
    expect(ElementList.PageContainer).toBeInTheDocument();
    expect(ElementList.NearbyContainer).toBeInTheDocument();
    expect(ElementList.PlaceContainer).toBeInTheDocument();
    expect(ElementList.OfferContainer).toBeInTheDocument();
  });
});
