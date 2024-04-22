import { useState } from 'react';
import './style.scss';

export const DropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState(null);

  // 드롭다운 타이틀
  const title = props.title;
  const arrowUp = props.arrowUp;
  const arrowDown = props.arrowDown;
  const array = props.children;

  // 드롭다운 아이템
  // 가격이 낮은 순, 가격이 높은 순, 예약 신청, 예약 취소

  const handleSelect = (e) => {
    const selectOption = e.target.outerText;
    setSelect(selectOption);
    console.log(select);
  };

  const handleTitle = (arrow) => {
    return (
      <div className="dropdown-title">
        <div>{select === null ? title : select}</div>
        <div>{arrow}</div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="dropdown-select"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {
          isOpen ? handleTitle(arrowUp) : handleTitle(arrowDown)

          // <div className="dropdown-title">
          //   <div>{title}</div>
          //   <div>{arrowDown}</div>
          // </div>
        }
      </div>
      <ul className="dropdown-option-list">
        {/* {isOpen &&
          array.map((e) => (
            <li className="dropdown-option" onClick={console.log(e.props.children[0])}>
              {e.props.children}
            </li>
          ))} */}
        {isOpen && (
          <li className="dropdown-option" onClick={handleSelect}>
            {array}
          </li>
        )}
      </ul>
    </div>
  );
};

export const DropdownItem = (props) => {
  return <div>{props.children}</div>;
};
