import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';
import categoryFilter from '@/utils/categoryFilter';
import { InputHTMLAttributes } from 'react';
import './styles.scss';

interface CategoryDropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  initValue?: string;
  setCategory: (value: string) => void;
}

export default function CategoryDropdown({ setCategory, initValue }: CategoryDropdownProps) {
  const handleDropdown = (value: DropDownValue) => {
    if (typeof value === 'string') {
      setCategory(value);
    }
  };

  const changedInitValue = categoryFilter(initValue);

  return (
    <div className="input-category">
      <DropDown
        id="category"
        title={initValue ? changedInitValue : `카테고리`}
        onClickItem={handleDropdown}
        arrowUp="∧"
        arrowDown="∨"
      >
        <DropdownItem value="문화 · 예술">🎉 파티룸</DropdownItem>
        <DropdownItem value="식음료">🎈 이벤트홀</DropdownItem>
        <DropdownItem value="스포츠">🎥 스튜디오</DropdownItem>
        <DropdownItem value="투어">🕋 공연장</DropdownItem>
        <DropdownItem value="관광">🤵 회의장</DropdownItem>
        <DropdownItem value="웰빙">🎤 연습실</DropdownItem>
      </DropDown>
    </div>
  );
}
