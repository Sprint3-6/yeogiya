import './style.scss';
import { FormEvent, MouseEvent, ChangeEvent } from 'react';

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
          <img src="/assets/icons/icon-map.svg" alt="핑" />
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
        <button
          className="button-black search-bar-button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => handleSearchSubmit(e, searchValue)}
        >
          검색하기
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
