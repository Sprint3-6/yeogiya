import { Link } from 'react-router-dom';

interface mypagesideProps {
  image: string;
  link: string;
  text: string;
}

export const MyPageSideList = ({ image, link, text }: mypagesideProps) => {
  return (
    <div className="mypage-side-item">
      <div className="mypage-side-item-image">
        <img src={image} alt={text} />
      </div>
      <div className="mypage-side-item-text">
        <Link to={link}>{text}</Link>
      </div>
    </div>
  );
};
