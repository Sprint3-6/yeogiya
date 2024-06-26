import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mypagesideitemProps } from '../types';

export const MypageSideListItem = ({ image, clickImage, link, text }: mypagesideitemProps) => {
  const [isIcon, setIsIcon] = useState(image);
  const location = useLocation();

  const handleMouseEnter = () => {
    setIsIcon(clickImage);
  };

  const handleMouseLeave = () => {
    if (`/${link}` !== location.pathname) {
      setIsIcon(image);
    }
  };

  useEffect(() => {
    if (`/${link}` === location.pathname) {
      setIsIcon(clickImage);
    } else {
      setIsIcon(image);
    }
  }, [location.pathname]);

  return (
    <Link to={link}>
      <div
        className={`/${link}` === location.pathname ? 'mypage-side-item-current' : 'mypage-side-item'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        key={text}
      >
        <div className="mypage-side-item-image">{isIcon && <img src={isIcon} alt={text} />}</div>
        <div className="mypage-side-item-text">{text}</div>
      </div>
    </Link>
  );
};
