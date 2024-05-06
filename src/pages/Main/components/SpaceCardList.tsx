import { useState } from 'react';
import SpaceCard from './SpaceCard';
import { Spaces, Category } from '@/api/types/activities';
import './spaceCardList.scss';
import { CATEGORIES } from '@/api/constants/categories';
import Button from '@/components/Button';
import categoryFilter from '@/utils/categoryFilter';
import { DropDown, DropdownItem } from '@/components/Dropdown';

interface SpaceCardListProps {
  searchResult: string;
  spaces: Spaces[];
  handleClickCategory: (category: Category) => void;
  handleSortSpaces: (value: string) => void;
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

  //TODO 드롭다운 밸류 설정
  return (
    <>
      {/* searchValue가 없을 때만 드롭다운과 카테고리 버튼을 렌더링 */}
      {searchResult === '' && (
        <>
          <DropDown id="space-list-dropdown" title="가격" onClickItem={handleSortSpaces}>
            <DropdownItem value="high">높은 순</DropdownItem>
            <DropdownItem value="row">낮은 순</DropdownItem>
          </DropDown>
          <div className="space-categories-wrapper">
            {CATEGORIES.map((category) => (
              <Button key={category} className="button-black" onClick={() => handleCategoryClick(category)}>
                {categoryFilter(category)}
              </Button>
            ))}
          </div>
        </>
      )}
      {/* selectedCategory가 null이면 빈 문자열을 전달하도록 수정 */}
      <h1>{categoryFilter(selectedCategory || '')}</h1>
      <div className="space-card-list-container">
        {spaces.map((space) => (
          <SpaceCard key={space.id} item={space} />
        ))}
      </div>
    </>
  );
}
