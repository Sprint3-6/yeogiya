import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface mypagesideProps {
  image: string;
  clickImage: string;
  link: string;
  text: string;
}

export const MyPageSideList = ({ image, clickImage, link, text }: mypagesideProps) => {
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
    console.log('현재 위치', location.pathname);
    console.log('현재 링크', link);
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
      >
        <div className="mypage-side-item-image">
          <img src={isIcon} alt={text} />
        </div>
        <div className="mypage-side-item-text">{text}</div>
      </div>
    </Link>
  );
};
