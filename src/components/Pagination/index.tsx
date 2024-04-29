import ArrowButton from './components/ArrowButton';
import usePaginator from '@/hooks/usePaginator/usePaginator';
import PageButton from './components/PageButton';
import './style.scss';

interface PaginationProps {
  totalCount?: number;
  size: number;
}

export default function Pagination({ totalCount, size }: PaginationProps) {
  const count = totalCount ?? 0;
  const { page, currentPageGroup, hasPrev, hasNext, handlePageClick, handlePrevClick, handleNextClick } = usePaginator(
    count,
    size,
  );

  if (count === 0) {
    return null;
  }

  return (
    <div className="pagination-wrapper">
      <ArrowButton isDisabled={!hasPrev} direction="prev" onClick={handlePrevClick} />
      {currentPageGroup.map((index) => (
        <PageButton key={index} page={index} onClick={() => handlePageClick(index)} isDisabled={page !== index} />
      ))}
      <ArrowButton isDisabled={!hasNext} direction="next" onClick={handleNextClick} />
    </div>
  );
}
