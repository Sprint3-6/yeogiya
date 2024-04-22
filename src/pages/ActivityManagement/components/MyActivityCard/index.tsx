import { MyActivityCardProps } from '../../types';
import './MyActivityCard.scss';

export default function MyActivityCard({ activity }: MyActivityCardProps) {
  const formattedPrice = activity.price.toLocaleString();
  return (
    <div className="my-activity-card-box">
      <img className="my-activity-card-img" src={activity.bannerImageUrl} alt="메인 사진" />
      <div className="my-activity-card-imf">
        <div>
          <img className="my-activity-card-star" src="/img/icon-star.svg" alt="rating star" />
          <span>
            {activity.rating}({activity.reviewCount})
          </span>
        </div>
        <h3>{activity.title}</h3>
        <div>
          <span>\{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}
