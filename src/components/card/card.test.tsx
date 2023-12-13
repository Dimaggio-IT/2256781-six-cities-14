import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '..';
import { makeFakeOfferPreview } from '../../utils';
import { withStoreAndHistory } from '../../utils/mock-component';

describe('Component: <Card />', () => {
  it('should render correct', () => {
    const fakeOfferPreview = makeFakeOfferPreview();
    const EXPECTED_CARD_TEST_ID = {
      CONTAINER: 'card-container',
      IMG: 'card-lazy-image',
      PRICE: 'card-price-container',
      RATING: 'starline-container',
      NAME: 'card-name-title',
      TYPE: 'card-type-paragraph',
    };
    const { withStoreComponent: wrappedCard } = withStoreAndHistory(
      <Card offer={fakeOfferPreview} />
    );

    const { getByTestId } = render(wrappedCard);

    const RESULT_LIST = {
      CONTAINER: getByTestId(EXPECTED_CARD_TEST_ID.CONTAINER),
      IMG: getByTestId(EXPECTED_CARD_TEST_ID.IMG),
      PRICE: getByTestId(EXPECTED_CARD_TEST_ID.PRICE),
      RATING: getByTestId(EXPECTED_CARD_TEST_ID.RATING),
      NAME: getByTestId(EXPECTED_CARD_TEST_ID.NAME),
      TYPE: getByTestId(EXPECTED_CARD_TEST_ID.TYPE),
    };

    expect(RESULT_LIST.CONTAINER).toBeInTheDocument();
    expect(RESULT_LIST.IMG).toBeInTheDocument();
    expect(RESULT_LIST.PRICE).toBeInTheDocument();
    expect(RESULT_LIST.RATING).toBeInTheDocument();
    expect(RESULT_LIST.NAME).toBeInTheDocument();
    expect(RESULT_LIST.TYPE).toBeInTheDocument();
  });

  it('should correct react onCardHover/onCardLeave', async () => {
    const user = userEvent.setup();
    const fakeOfferPreview = makeFakeOfferPreview();
    const handleCardHover = vi.fn();
    const handleCardLeave = vi.fn();
    const { withStoreComponent: wrappedCard } = withStoreAndHistory(
      <Card
        offer={fakeOfferPreview}
        onCardHover={handleCardHover}
        onCardLeave={handleCardLeave}
      />
    );

    const { getByTestId: getComponentContainer } = render(wrappedCard);
    const cardContainer = getComponentContainer('card-container');
    await user.hover(cardContainer);
    await user.unhover(cardContainer);
    expect(handleCardHover).toBeCalled();
    expect(handleCardLeave).toBeCalled();
  });
});
