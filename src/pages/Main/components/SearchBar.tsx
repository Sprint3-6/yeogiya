import './searchBar.scss';
import { FormEvent, MouseEvent, ChangeEvent } from 'react';

/*TODO 검색창 문구 변경
[] 검색하기 버튼 누를 때 검색됨
[] 검색어 포함 최신순 / 페이지네이션
[] 검색 필터 기준 : 키워드가 제목에 일부라도 포함된 경우 모두 검색
[] 검색 할 때 카테고리 or 가격 순 필터 모두 초기화
[] category, sort 쿼리 X
[] 검색된 결과 없을 때
[] '검색어' 으로 검색한 결과 표시 + 결과 개수
*/

interface SearchBarProps {
  searchValue: string;
  handleSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>,
    text?: string,
  ) => void;
}

function SearchBar({ searchValue, handleSearchText, handleSearchSubmit }: SearchBarProps) {
  return (
    <div className="search-bar-wrapper">
      <h1>어떤 공간을 원하시나요?</h1>
      <div className="search-bar-search-box">
        <form className="search-bar-input-form" onSubmit={handleSearchSubmit}>
          <img src="/favicon.svg" alt="favicon" />
          <input
            type="search"
            value={searchValue}
            onChange={handleSearchText}
            className="search-bar-input"
            placeholder="내가 원하는 공간은"
          />
          {searchValue && (
            <button
              className="search-bar-delete-search-button"
              onClick={(e) => handleSearchSubmit(e, '')}
              type="button"
            >
              <img src="/assets/icons/icon-closed.svg" alt="icon-closed" />
            </button>
          )}
        </form>
        <button onClick={(e: MouseEvent<HTMLButtonElement>) => handleSearchSubmit(e, searchValue)}>검색하기</button>
      </div>
    </div>
  );
}

export default SearchBar;