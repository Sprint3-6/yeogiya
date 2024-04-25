import { Link } from 'react-router-dom';
import { MySpaceCardProps } from '../../types';
import './style.scss';

export default function MySpaceCard({ activity }: MySpaceCardProps) {
  const formattedPrice = activity.price.toLocaleString();
  return (
    <Link to={`/space/${activity.id}`}>
      <div className="my-space-card-box">
        <img className="my-space-card-img" src={activity.bannerImageUrl} alt="메인 사진" />
        <div className="my-space-card-imf">
          <div>
            <div className="my-space-card-star-box">
              <img className="my-space-card-star" src="/assets/icons/icon-star.svg" alt="rating star" />
              <span>
                {activity.rating}({activity.reviewCount})
              </span>
            </div>
            <h3>{activity.title}</h3>
          </div>
          <div className="my-space-card-price">
            <span>￦{formattedPrice}</span>
            <Link to={`edit/${activity.id}`}>
              <img src="/assets/icons/icon-meatball.svg" alt="관리하기 열기" />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
