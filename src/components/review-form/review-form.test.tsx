import { fireEvent, render, screen } from '@testing-library/react';
import { withStoreAndHistory } from '../../utils/mock-component';
import { ReviewForm } from '..';
import * as store from '../../store';
import userEvent from '@testing-library/user-event';
import { NameSpace, RequestStatus } from '../../const';
import { toast } from 'react-toastify';

describe('Component <ReviewForm />:', () => {
  const fakeOfferId = '123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const starCount = 5;
    const EXPECTED_ID = {
      TEXTAREA: 'Your review',
      INPUTS: 'input[name="rating"]',
      HELP_TEXT: /To submit review/i,
      SUBMIT_BUTTON: 'Submit',
    };

    const { withStoreComponent: reviewFormWrappedComponent } =
      withStoreAndHistory(<ReviewForm offerId={fakeOfferId} />);

    render(reviewFormWrappedComponent);

    const RESULT_LIST = {
      TEXTAREA: screen.getByLabelText(EXPECTED_ID.TEXTAREA),
      INPUTS: document.querySelectorAll(EXPECTED_ID.INPUTS),
      HELP_TEXT: screen.getByText(EXPECTED_ID.HELP_TEXT),
      SUBMIT_BUTTON: screen.getByText(EXPECTED_ID.SUBMIT_BUTTON),
    };

    // expect to have all the components in the DOM
    expect(RESULT_LIST.TEXTAREA).toBeInTheDocument();
    expect(RESULT_LIST.INPUTS.length).toBe(starCount);
    expect(RESULT_LIST.HELP_TEXT).toBeInTheDocument();
    expect(RESULT_LIST.SUBMIT_BUTTON).toBeInTheDocument();
    expect(RESULT_LIST.SUBMIT_BUTTON).toBeDisabled();
  });

  it('handles text and rating change correctly', () => {
    const expectedFakeCorrectText =
      'This is a review of more than 50 characters. Now for sure.';
    const expectedFakeIncorrectText = 'This is a review.';
    const EXPECTED_ID = {
      TEXTAREA: 'Your review',
      INPUT: 'rating-form-item-3',
      SUBMIT_BUTTON: 'Submit',
    };

    const { withStoreComponent: reviewFormWrappedComponent } =
      withStoreAndHistory(<ReviewForm offerId={fakeOfferId} />);

    render(reviewFormWrappedComponent);

    const RESULT_LIST = {
      TEXTAREA: screen.getByLabelText(EXPECTED_ID.TEXTAREA),
      INPUT: screen.getByTestId(EXPECTED_ID.INPUT),
      SUBMIT_BUTTON: screen.getByText(EXPECTED_ID.SUBMIT_BUTTON),
    };

    // only incorrect text was entered
    fireEvent.change(RESULT_LIST.TEXTAREA, {
      target: { value: expectedFakeIncorrectText },
    });
    expect(RESULT_LIST.TEXTAREA).toHaveValue(expectedFakeIncorrectText);
    expect(RESULT_LIST.SUBMIT_BUTTON).toBeDisabled();

    // entered incorrect text and clicked on the rating
    fireEvent.change(RESULT_LIST.TEXTAREA, {
      target: { value: expectedFakeIncorrectText },
    });
    expect(RESULT_LIST.TEXTAREA).toHaveValue(expectedFakeIncorrectText);
    fireEvent.click(RESULT_LIST.INPUT);
    expect(RESULT_LIST.SUBMIT_BUTTON).toBeDisabled();

    // entered the correct data(text and rating) to send to the server
    fireEvent.change(RESULT_LIST.TEXTAREA, {
      target: { value: expectedFakeCorrectText },
    });
    expect(RESULT_LIST.TEXTAREA).toHaveValue(expectedFakeCorrectText);
    fireEvent.click(RESULT_LIST.INPUT);
    expect(RESULT_LIST.SUBMIT_BUTTON).toBeEnabled();
  });

  it('handles form submission correctly', async () => {
    const user = userEvent.setup();
    const postAsyncReviewSpy = vi.spyOn(store, 'postAsyncReview');
    const expectedFakeCorrectText =
      'This is a review of more than 50 characters. Now for sure.';
    const expectedPostData = {
      id: fakeOfferId,
      comment: expectedFakeCorrectText,
      rating: 3,
    };
    const EXPECTED_ID = {
      TEXTAREA: 'Your review',
      INPUT: 'rating-form-item-3',
      SUBMIT_BUTTON: 'Submit',
    };

    const { withStoreComponent: reviewFormWrappedComponent } =
      withStoreAndHistory(<ReviewForm offerId={fakeOfferId} />);

    render(reviewFormWrappedComponent);

    const RESULT_LIST = {
      TEXTAREA: screen.getByLabelText(EXPECTED_ID.TEXTAREA),
      INPUT: screen.getByTestId(EXPECTED_ID.INPUT),
      SUBMIT_BUTTON: screen.getByText(EXPECTED_ID.SUBMIT_BUTTON),
    };

    // entered the correct data(text and rating).
    // should run action with the data passed to it, which will send the data to the server
    fireEvent.change(RESULT_LIST.TEXTAREA, {
      target: { value: expectedFakeCorrectText },
    });
    fireEvent.click(RESULT_LIST.INPUT);
    await user.click(RESULT_LIST.SUBMIT_BUTTON);

    expect(postAsyncReviewSpy).toHaveBeenCalledWith(expectedPostData);
  });

  it('handles review request "Pending" status correctly', () => {
    const expectedSubmitButtonText = 'Sending...';
    const submitButtonTestId = 'submit-button';
    const initialState = {
      [NameSpace.Offer]: {
        isOfferLoading: false,
        offer: null,
        nearbyPlaces: [],
        reviews: [],
        reviewRequestStatus: RequestStatus.Pending,
      },
    };
    const { withStoreComponent: reviewFormWrappedComponent } =
      withStoreAndHistory(<ReviewForm offerId={fakeOfferId} />, initialState);

    const { getByTestId } = render(reviewFormWrappedComponent);
    const submitButtonElement = getByTestId(submitButtonTestId);
    expect(submitButtonElement.textContent).toEqual(expectedSubmitButtonText);
    expect(submitButtonElement).toBeDisabled();
  });

  it('handles review request "Success" status correctly', () => {
    const assignReviewRequestStatusSpy = vi.spyOn(
      store,
      'assignReviewRequestStatusByDefault'
    );
    const initialState = {
      [NameSpace.Offer]: {
        isOfferLoading: false,
        offer: null,
        nearbyPlaces: [],
        reviews: [],
        reviewRequestStatus: RequestStatus.Success,
      },
    };
    const { withStoreComponent: reviewFormWrappedComponent } =
      withStoreAndHistory(<ReviewForm offerId={fakeOfferId} />, initialState);
    render(reviewFormWrappedComponent);
    expect(assignReviewRequestStatusSpy).toHaveBeenCalledTimes(1);
  });

  it('handles review request "Error" status correctly', () => {
    const expectedToastMessages = [
      'Error sending a comment',
      {
        position: 'top-center',
      },
    ];
    const toastSpy = vi.spyOn(toast, 'warn');
    const initialState = {
      [NameSpace.Offer]: {
        isOfferLoading: false,
        offer: null,
        nearbyPlaces: [],
        reviews: [],
        reviewRequestStatus: RequestStatus.Error,
      },
    };
    const { withStoreComponent: reviewFormWrappedComponent } =
      withStoreAndHistory(<ReviewForm offerId={fakeOfferId} />, initialState);

    render(reviewFormWrappedComponent);
    expect(toastSpy.mock.lastCall).toEqual(expectedToastMessages);
  });
});
