import './paginationButton.scss';

interface PageButtonProps {
  isDisabled?: boolean;
  page: number;
  onClick: () => void;
}

export default function PageButton({ isDisabled, page, onClick }: PageButtonProps) {
  const buttonClassName = `pagination-button ${isDisabled ? 'disabled' : ''}`;

  return (
    <button onClick={onClick} className={buttonClassName}>
      {page}
    </button>
  );
}
