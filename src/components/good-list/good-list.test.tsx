import { render } from '@testing-library/react';
import { GoodList } from '..';
import { makeFakeGoods } from '../../utils';

describe('Component: <GoodList />', () => {
  it('should render correct', () => {
    const goodContainerTestId = 'goods-container';
    const goodsListTestId = 'goods-list';
    const goodItemTestId = 'goods-item';
    const fakeGoods: string[] = makeFakeGoods();
    const fakeGoodsCount = fakeGoods.length;
    const { getByTestId, getAllByTestId } = render(
      <GoodList goods={fakeGoods} />
    );

    const goodContainer = getByTestId(goodContainerTestId);
    const goodListContainer = getByTestId(goodsListTestId);
    const goodItems = getAllByTestId(goodItemTestId);

    expect(goodContainer).toBeInTheDocument();
    expect(goodListContainer).toBeInTheDocument();
    expect(goodItems.length).toBe(fakeGoodsCount);
  });
});
