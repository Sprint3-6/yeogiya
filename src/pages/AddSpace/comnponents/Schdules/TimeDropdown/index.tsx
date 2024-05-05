import { DropDown, DropdownItem } from '@/components/Dropdown';

interface TimeDropdownProps {
  onClick: (value: string) => void;
}

export default function 그렴TimeDropdown({ onClick }: TimeDropdownProps) {
  return (
    <DropDown id="category" title="00:00" onClickItem={onClick} arrowUp="∧" arrowDown="∨">
      {[...Array(49)].map((_, index) => {
        const hour = Math.floor(index / 2);
        const minute = index % 2 === 0 ? '00' : '30';
        const time = `${String(hour).padStart(2, '0')}:${minute}`;
        return (
          <DropdownItem key={index} value={time}>
            {time}
          </DropdownItem>
        );
      })}
    </DropDown>
  );
}
