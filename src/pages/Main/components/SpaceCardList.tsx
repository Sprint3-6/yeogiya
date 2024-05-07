import { useState } from 'react';
import SpaceCard from './SpaceCard';
import { Spaces, Category } from '@/api/types/activities';
import './spaceCardList.scss';
import { CATEGORIES } from '@/api/constants/categories';
import Button from '@/components/Button';
import categoryFilter from '@/utils/categoryFilter';
import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';

interface SpaceCardListProps {
  searchResult: string;
  spaces: Spaces[];
  handleClickCategory: (category: Category) => void;
  handleSortSpaces: (value: DropDownValue) => void;
}

export default function SpaceCardList({
  searchResult,
  spaces,
  handleClickCategory,
  handleSortSpaces,
}: SpaceCardListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    handleClickCategory(category);
  };

  const renderCategoryButtons = () => {
    return CATEGORIES.map((category) => {
      const isActive = category === selectedCategory; // 선택된 카테고리인지 확인

      return (
        <Button
          key={category}
          // 선택된 카테고리일 경우 추가 클래스를 부여하고 disabled 상태 설정
          className={isActive ? 'button-black' : 'button-white'}
          onClick={() => handleCategoryClick(category)}
          disabled={isActive} // 선택된 카테고리의 버튼은 비활성화
        >
          {categoryFilter(category)}
        </Button>
      );
    });
  };

  return (
    <section className="main-space-card-list-container">
      {/* searchValue가 없을 때만 드롭다운과 카테고리 버튼을 렌더링 */}
      {searchResult === '' && <div className="space-categories-wrapper">{renderCategoryButtons()}</div>}
      {/* 검색어가 있으면 검색어를, 그렇지 않으면 카테고리 이름을 표시 */}
      <div className="space-list-selected-wrapper">
        {searchResult !== '' ? (
          <div className="space-list-search-result">
            <div className="space-list-search-result-word">
              <h3>{searchResult}</h3>
              <p>으로 검색한 결과입니다</p>
            </div>
            <div className="space-list-search-result-count">
              <span>총 </span>
              <span className="highlighted-count">{spaces.length}</span>
              <span>개의 공간이 있습니다</span>
            </div>
          </div>
        ) : (
          <>
            <h3>{categoryFilter(selectedCategory || '')}</h3>
            <div className="space-list-sort-dropdown">
              <DropDown
                id="space-list-dropdown"
                title="가격"
                arrowUp={'▲'}
                arrowDown={'▼'}
                onClickItem={handleSortSpaces}
              >
                <DropdownItem value="high">높은 순</DropdownItem>
                <DropdownItem value="row">낮은 순</DropdownItem>
              </DropDown>
            </div>
          </>
        )}
      </div>
      {/* spaces 데이터가 없을 때 조건부 렌더링 */}
      {spaces.length === 0 ? (
        <div className="not-found-file-box">
          <img src="/assets/images/not-found-file.svg" alt="관리할 방이 없습니다" />
          <span>해당하는 공간이 없어요</span>
        </div>
      ) : (
        <div className="space-card-list-container">
          {spaces.map((space) => (
            <SpaceCard key={space.id} item={space} />
          ))}
        </div>
      )}
    </section>
  );
}
