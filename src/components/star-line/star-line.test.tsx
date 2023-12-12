import { render, screen } from '@testing-library/react';
import { StarLine } from '..';
import { StarType } from '../../const';
import { calculateRating } from '../../utils';

describe('Component: <StarLine />', () => {
  it('Should render correctly', () => {
    const starLineTestId = 'starline-container';

    render(<StarLine rating={1} />);

    const starLineContainer = screen.getByTestId(starLineTestId);

    expect(starLineContainer).toBeInTheDocument();
  });

  it('Should render component with specified class "Card" value', () => {
    const starLineType = StarType.Card;
    const starLineContainerClassName = `${starLineType}__rating rating`;
    const starRatingClassName = `${starLineType}__stars rating__stars`;
    const starLineContainerTestId = 'starline-container';
    const calculatedRratingTestId = 'calculated-rating';
    const offerRatingTestId = 'offer-rating';
    const rating = 1;

    render(<StarLine type={starLineType} rating={rating} />);

    const starLineContainer = screen.getByTestId(starLineContainerTestId);
    expect(starLineContainer).toHaveClass(starLineContainerClassName);

    expect(starLineContainer.children[0]).toHaveClass(starRatingClassName);

    const calculatedRating = calculateRating(rating);
    const calculeateRatingSpan = screen.getByTestId(calculatedRratingTestId);

    expect(calculeateRatingSpan).toBeInTheDocument();
    expect(calculeateRatingSpan.getAttribute('style')).toBe(
      `width: ${calculatedRating};`
    );

    const offerRatingSpan = screen.queryByTestId(offerRatingTestId);
    expect(offerRatingSpan).toBeNull();
  });

  it('Should render component with specified class "Review" value', () => {
    const starLineType = StarType.Review;
    const starLineContainerClassName = `${starLineType}__rating rating`;
    const starRatingClassName = `${starLineType}__stars rating__stars`;
    const starLineContainerTestId = 'starline-container';
    const calculatedRratingTestId = 'calculated-rating';
    const offerRatingTestId = 'offer-rating';
    const rating = 1;

    render(<StarLine type={starLineType} rating={rating} />);

    const starLineContainer = screen.getByTestId(starLineContainerTestId);
    expect(starLineContainer).toHaveClass(starLineContainerClassName);

    expect(starLineContainer.children[0]).toHaveClass(starRatingClassName);

    const calculatedRating = calculateRating(rating);
    const calculeateRatingSpan = screen.getByTestId(calculatedRratingTestId);

    expect(calculeateRatingSpan).toBeInTheDocument();
    expect(calculeateRatingSpan.getAttribute('style')).toBe(
      `width: ${calculatedRating};`
    );

    const offerRatingSpan = screen.queryByTestId(offerRatingTestId);
    expect(offerRatingSpan).toBeNull();
  });

  it('Should render component with specified class "Offer" value', () => {
    const starLineType = StarType.Offer;
    const starLineContainerClassName = `${starLineType}__rating rating`;
    const starRatingClassName = `${starLineType}__stars rating__stars`;
    const starLineContainerTestId = 'starline-container';
    const calculatedRratingTestId = 'calculated-rating';
    const offerRatingTestId = 'offer-rating';
    const rating = 1;

    render(<StarLine type={starLineType} rating={rating} />);

    const starLineContainer = screen.getByTestId(starLineContainerTestId);
    expect(starLineContainer).toHaveClass(starLineContainerClassName);

    expect(starLineContainer.children[0]).toHaveClass(starRatingClassName);

    const calculatedRating = calculateRating(rating);
    const calculeateRatingSpan = screen.getByTestId(calculatedRratingTestId);

    expect(calculeateRatingSpan).toBeInTheDocument();
    expect(calculeateRatingSpan.getAttribute('style')).toBe(
      `width: ${calculatedRating};`
    );

    const offerRatingSpan = screen.getByTestId(offerRatingTestId);
    expect(offerRatingSpan).toBeInTheDocument();
  });
});
