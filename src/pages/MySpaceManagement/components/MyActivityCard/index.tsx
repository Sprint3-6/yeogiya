import { MyActivityCardProps } from '../../types';
import './MyActivityCard.scss';

export default function MyActivityCard({ activity }: MyActivityCardProps) {
  const formattedPrice = activity.price.toLocaleString();
  return (
    <div className="my-activity-card-box">
      <img className="my-activity-card-img" src={activity.bannerImageUrl} alt="메인 사진" />
      <div className="my-activity-card-imf">
        <div>
          <div className="my-activity-card-star-box">
            <img className="my-activity-card-star" src="/assets/icons/icon-star.svg" alt="rating star" />
            <span>
              {activity.rating}({activity.reviewCount})
            </span>
          </div>
          <h3>{activity.title}</h3>
        </div>
        <div className="my-activity-card-price">
          <span>￦{formattedPrice}</span>
          <img src="assets/icons/icon-meatball.svg" alt="관리하기 열기" />
        </div>
      </div>
    </div>
  );
}
