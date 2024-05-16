import './style.scss';
import usePaginator from '@/hooks/usePaginator/usePaginator';
import ArrowButton from './components/ArrowButton';
import PageButton from './components/PageButton';

interface PaginationProps {
  totalCount?: number; // 전체 데이터 개수
  size: number; // 한 페이지당 보여줄 데이터 개수
  page: number; // 현재 페이지 번호
  setPage: (value: number) => void; // 현재 페이지 번호 set 함수
}

export default function Pagination({ totalCount, size, page, setPage }: PaginationProps) {
  const count = totalCount ?? 0;
  const { currentPageGroup, hasPrev, hasNext } = usePaginator(count, size, page);

  if (count === 0) {
    return null;
  }

  return (
    <div className="pagination-wrapper">
      <ArrowButton isDisabled={!hasPrev} direction="prev" onClick={() => setPage(page - 1)} />
      {currentPageGroup.map((num) => (
        <PageButton key={num} page={num} onClick={() => setPage(num)} isDisabled={page !== num} />
      ))}
      <ArrowButton isDisabled={!hasNext} direction="next" onClick={() => setPage(page + 1)} />
    </div>
  );
}
