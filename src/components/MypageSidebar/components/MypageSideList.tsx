import { useState } from 'react';
import { Link } from 'react-router-dom';

interface mypagesideProps {
  image: string;
  clickImage: string;
  link: string;
  text: string;
}

export const MyPageSideList = ({ image, clickImage, link, text }: mypagesideProps) => {
  const [isIcon, setIsIcon] = useState(image);

  const handleMouseEnter = () => {
    setIsIcon(clickImage);
  };

  const handleMouseLeave = () => {
    setIsIcon(image);
  };

  // if (window.location.pathname === `/${link}`) {
  //   handleMouseEnter();
  // } else {
  //   handleMouseLeave();
  // }
  // useEffect(() => {
  // }, [window.location.pathname]);

  return (
    <Link to={link}>
      <div className="mypage-side-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="mypage-side-item-image">
          <img src={isIcon} alt={text} />
        </div>
        <div className="mypage-side-item-text">{text}</div>
      </div>
    </Link>
  );
};
