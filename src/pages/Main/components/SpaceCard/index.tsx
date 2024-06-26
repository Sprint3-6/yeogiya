import './style.scss';
import { Link } from 'react-router-dom';
import { Spaces } from '@/api/types/activities';
import { intToFloat } from '@/utils/intToFloat';
import { formatPrice } from '@/utils/formatPrice';

type SpaceCardProps = { item: Pick<Spaces, Exclude<keyof Spaces, 'address' | 'createdAt' | 'updatedAt'>> };

export default function SpaceCard({ item }: SpaceCardProps) {
  return (
    <Link to={`/space/${item.id}`}>
      <div className="space-card-container">
        <div className="space-card-image-wrapper">
          <img src={item.bannerImageUrl} alt="공간 배너 이미지" />
        </div>
        <div className="space-card-detail-wrapper">
          <div className="space-card-detail-description-wrapper">
            <div className="space-card-detail-review-wrapper">
              <span>⭐</span>
              <p>
                {intToFloat(item.rating, 1)}
                <span> ({item.reviewCount})</span>
              </p>
            </div>
            <div className="space-card-detail-title-wrapper">
              <h1 className="space-card-detail-title">{item.title}</h1>
            </div>
          </div>
          <div className="space-card-detail-price-wrapper">
            <p>₩ {formatPrice(item.price)}</p>
            <span>/ 인</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
