import MypageSideList from './MypageSideList';
import './MypageHeader.scss';
import { useRef, useState } from 'react';

export const MypageHeader = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>();

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag && startX !== undefined && scrollRef.current) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  return (
    <div className="mypage-header">
      <div
        className="mypage-header-box"
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <MypageSideList />
      </div>{' '}
    </div>
  );
};
