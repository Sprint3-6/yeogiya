import { createContext, useContext, useEffect, useRef, useState } from 'react';
import './style.scss';

interface DropDwonProps {
  id: string;
  title?: string;
  image?: string;
  arrowUp?: string;
  arrowDown?: string;
  children: React.ReactNode;
  onClickItem?: (value: string, id: string) => void;
}

interface DropdownItem {
  value: string;
  children: React.ReactNode;
  itemStyle?: React.CSSProperties;
}

interface DropdownContextProps {
  handleClickItem?: (children: React.ReactNode, value: string) => void;
}

export const DropdownContext = createContext<DropdownContextProps>({});

export const DropDown = (props: DropDwonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<React.ReactNode | null>(null);

  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭시 드롭다운 내부에 속해 있는지 확인
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        // 드롭다운 외부 클릭했을 때 상태 변경
        setIsOpen(false);
      }
    };

    // 클릭시 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 드롭다운 props
  const title = props.title;
  const image = props.image;
  const arrowUp = props.arrowUp;
  const arrowDown = props.arrowDown;
  const array = props.children;
  const id = props.id;
  const onClickItem = props.onClickItem;

  // 드롭다운 셀렉터 보여주는 함수
  const handleShowTitle = () => {
    if (image) {
      return (
        <div className="dropdown-title">
          <div className="dropdown-image">
            <img src={image} />
          </div>
          <div className="dropdown-title">{title ? title : null}</div>
        </div>
      );
    } else if (title) {
      return <div className="dropdown-title">{select ? select : title}</div>;
    }
  };

  // 드롭다운 셀렉터
  const handleTitle = (arrow?: string) => {
    return (
      <div className="dropdown-title">
        <div>{handleShowTitle()}</div>
        {arrow ? <div>{arrow}</div> : null}
      </div>
    );
  };

  // 드롭다운 클릭시 실행 함수
  const handleClickItem = (children: React.ReactNode, value: string) => {
    setSelect(children);
    onClickItem?.(id, value);
    console.log('아이템', children);
  };

  const contextValue = {
    handleClickItem,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        className="dropdown"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        id={id}
        ref={dropDownRef}
      >
        <div className="dropdown-select">{isOpen ? handleTitle(arrowUp) : handleTitle(arrowDown)}</div>
        <div></div>
        <ul className="dropdown-list">{isOpen && array}</ul>
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownItem = ({ children, value, itemStyle }: DropdownItem) => {
  const { handleClickItem } = useContext(DropdownContext);
  return (
    <li className="dropdown-item" onClick={() => handleClickItem?.(children, value)} style={itemStyle}>
      {children}
    </li>
  );
};
