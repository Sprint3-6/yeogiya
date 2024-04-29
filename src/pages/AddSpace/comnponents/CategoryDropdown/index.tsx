import { DropDown, DropdownItem } from '@/components/Dropdown';

interface CategoryDropdownProps {
  setCategory: (value: string) => void;
}

export default function CategoryDropdown({ setCategory }: CategoryDropdownProps) {
  const handleDropdown = (value: string) => {
    setCategory(value);
  };
  return (
    <div>
      <DropDown id="category" title="카테고리" onClickItem={handleDropdown}>
        <DropdownItem value="문화 · 예술">파티룸</DropdownItem>
        <DropdownItem value="식음료">이벤트홀</DropdownItem>
        <DropdownItem value="스포츠">스튜디오</DropdownItem>
        <DropdownItem value="투어">공연장</DropdownItem>
        <DropdownItem value="관광">회의장</DropdownItem>
        <DropdownItem value="웰빙">연습실</DropdownItem>
      </DropDown>
    </div>
  );
}
