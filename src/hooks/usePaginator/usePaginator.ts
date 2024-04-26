/*TODO
- page: 버튼 클릭 몇페이지인지? (쿼리)
- size: 페이지 당 보여줄 데이터 개수, 반응형으로 개수가 달라짐 (쿼리)
- category, keyword, sort (메인페이지)
- 보여줄 페이지 배열 (1~5) (6~10) 업데이트
- 전체 페이지 개수: totalCount / size
- 이전, 다음 버튼: 활성 / 비활성화 (이전 또는 다음 페이지가 있는지?), 몇페이지인지 업데이트,,
- url 프롭으로 전달 받고 API 호출?
- method는 offset
*/

import { useEffect, useState } from 'react';

const PAGE_ARRAY_LIMIT = 5;

interface PaginationUtilProps {
  page: number;
  currentPageGroup: number[] | [];
  hasPrev: boolean;
  hasNext: boolean;
  handlePageClick: (index: number) => void;
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

export default function usePaginator(totalCount: number, size: number): PaginationUtilProps {
  const [page, setPage] = useState(1);
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
    console.log(`현재 페이지: ${page}`);
    setCurrentPageGroup(pageNumbers);
  }, [page, totalCount, size]);

  const handlePrevClick = () => {
    if (hasPrev) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (index: number) => {
    setPage(index);
  };

  const handleNextClick = () => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  };

  return { page, currentPageGroup, hasPrev, hasNext, handlePageClick, handlePrevClick, handleNextClick };
}
