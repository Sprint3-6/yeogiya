import Button from '@/components/Button';
import './searchBar.scss';

/*TODO 검색창 문구 변경
[] 검색하기 버튼 누를 때 검색됨
[] 검색어 포함 최신순 / 페이지네이션
[] 검색 필터 기준 : 키워드가 제목에 일부라도 포함된 경우 모두 검색
[] 검색 할 때 카테고리 or 가격 순 필터 모두 초기화
[] category, sort 쿼리 X
[] 검색된 결과 없을 때
[] '검색어' 으로 검색한 결과 표시 + 결과 개수
*/
/*
interface SearchBarProps {
  searchValue: string;
  handleSearchSpace: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (event: FormEvent<HTMLFormElement>, text?: string) => void;
}*/

export default function SearchBar() {
  return (
    <div className="search-bar-wrapper">
      <h1>어떤 공간을 원하시나요?</h1>
      <div className="search-bar-search-box">
        <form className="search-bar-input-form">
          <img src="/favicon.svg" />
          <input
            type="search"
            //value={searchValue}
            //onChange={handleSearchSpace}
            className="search-bar-input"
            placeholder="내가 원하는 공간은"
          />
          <button className="search-bar-delete-search-button">
            <img src="/assets/icons/icon-closed.svg" />
          </button>
        </form>
        <Button type="submit">검색하기</Button>
      </div>
    </div>
  );
}
