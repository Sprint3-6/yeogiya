import { useEffect, useState } from 'react';

const PAGE_ARRAY_LIMIT = 5;

interface PaginationUtilProps {
  currentPageGroup: number[] | []; // 현재 보여질 페이지 배열 (1~5, 6~10, ...)
  hasPrev: boolean; // 이전 버튼 비활성화 여부
  hasNext: boolean; // 다음 버튼 비활성화 여부
}

export default function usePaginator(totalCount: number, size: number, page: number): PaginationUtilProps {
  const [currentPageGroup, setCurrentPageGroup] = useState<number[]>([]);
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(false);

  const totalPage = Math.ceil(totalCount / size);

  useEffect(() => {
    setHasPrev(page > 1);
    setHasNext(page < totalPage);

    const currentGroup = Math.ceil(page / PAGE_ARRAY_LIMIT);
    const startPage = (currentGroup - 1) * PAGE_ARRAY_LIMIT + 1;
    const endPage = Math.min(currentGroup * PAGE_ARRAY_LIMIT, totalPage);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    setCurrentPageGroup(pageNumbers);
  }, [page, totalCount, size]);

  return { currentPageGroup, hasPrev, hasNext };
}
