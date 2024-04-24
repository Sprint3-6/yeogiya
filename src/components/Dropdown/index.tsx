import { useState } from 'react';
import './style.scss';

interface DropDwonProps {
  title?: string;
  image?: string;
  arrowUp?: string;
  arrowDown?: string;
  items: DropdownItem[];
  onClickItem: (value: string) => void;
}

interface DropDwonItemProps {
  item: string;
  value: string;
  handleClickItem: (item: string, value: string) => void;
}

export interface DropdownItem {
  value: string;
  itemname: string;
}

export const DropDown = (props: DropDwonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<string | null>(null);

  // 드롭다운 타이틀
  const title = props.title;
  const image = props.image;
  const arrowUp = props.arrowUp;
  const arrowDown = props.arrowDown;
  const items = props.items;
  const onClickItem = props.onClickItem;

  // 드롭다운 아이템
  // 가격이 낮은 순, 가격이 높은 순, 예약 신청, 예약 취소

  // const handleSelect = (e) => {
  //   const selectOption = e.target.outerText;
  //   setSelect(selectOption);
  //   console.log('타이틀', title);
  //   console.log('타이틀', items);
  // };

  const handleShowTitle = () => {
    if (image) {
      return (
        <div>
          <div>
            <img src={image} />
          </div>
          <div>{title ? title : null}</div>
        </div>
      );
    } else if (title) {
      return <div>{select ? select : title}</div>;
    }
  };

  const handleTitle = (arrow?: string) => {
    return (
      <div className="dropdown-title">
        <div>{handleShowTitle()}</div>
        <div>{arrow}</div>
      </div>
    );
  };

  const handleClickItem = (item: string, value: string) => {
    setSelect(item);
    onClickItem(value);
    console.log('아이템', item);
    console.log('키값', value);
  };

  return (
    <div>
      <div
        className="dropdown-select"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? handleTitle(arrowUp) : handleTitle(arrowDown)}
      </div>
      <ul className="dropdown-option-list">
        {isOpen &&
          items.map((e) => <DropdownItem value={e.value} item={e.itemname} handleClickItem={handleClickItem} />)}
      </ul>
    </div>
  );
};

export const DropdownItem = ({ item, value, handleClickItem }: DropDwonItemProps) => {
  // return <div onClick={props.onClick}>{props.children}</div>;
  return (
    <li className="dropdown-item" onClick={() => handleClickItem(item, value)}>
      {item}
    </li>
  );
};
