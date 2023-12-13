import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../utils/mock-component';
import { makeFakeState } from '../../utils';
import { Sorting } from '..';
import { TSorting } from '../../types';

describe('Component <Sorting />:', () => {
  it('should render correct', () => {
    const currentSorting: TSorting = 'POPULAR';
    const onSortChange = vi.fn();
    const expectedText = 'Top rated first';
    const { withStoreComponent } = withStore(
      <Sorting activeSorting={currentSorting} onChange={onSortChange} />,
      makeFakeState()
    );

    render(withStoreComponent);
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should called with the sorting value "TOP" when the value in the drop-down list is clicked', async () => {
    const user = userEvent.setup();
    const currentSorting: TSorting = 'POPULAR';
    const sortingElementText = 'Top rated first';
    const sortingElementValue: TSorting = 'TOP';
    const onSortChange = vi.fn();
    const { withStoreComponent } = withStore(
      <Sorting activeSorting={currentSorting} onChange={onSortChange} />,
      makeFakeState()
    );

    render(withStoreComponent);
    const sortElement = screen.getByText(sortingElementText);
    await user.click(sortElement);

    expect(onSortChange).toBeCalled();
    expect(onSortChange).toBeCalledWith(sortingElementValue);
  });
});
