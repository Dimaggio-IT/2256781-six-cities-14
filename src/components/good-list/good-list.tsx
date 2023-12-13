type TGoodListProps = {
  goods: string[];
};

function GoodList({ goods }: TGoodListProps): JSX.Element {
  return (
    <div className="offer__inside" data-testid="goods-container">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list" data-testid="goods-list">
        {goods.map((good) => (
          <li key={good} className="offer__inside-item" data-testid="goods-item">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { GoodList };
