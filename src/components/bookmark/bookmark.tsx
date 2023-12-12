type TBookmarkProps = {
  actionClass: string;
  imageClass: string;
  imageWidth?: string;
  imageHeight?: string;
  hiddenDescription: string;
  onMarkChange?: () => void;
};

function Bookmark({
  actionClass,
  imageClass,
  imageWidth = '18',
  imageHeight = '19',
  hiddenDescription,
  onMarkChange = () => {},
}: TBookmarkProps): JSX.Element {
  return (
    <button
      className={actionClass}
      type="button"
      onClick={() => onMarkChange()}
      data-testid="offer-bookmark"
    >
      <svg
        className={imageClass}
        width={imageWidth}
        height={imageHeight}
        data-testid="offer-bookmark-icon"
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{hiddenDescription}</span>
    </button>
  );
}

export { Bookmark };
