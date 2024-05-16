import './style.scss';
import { Link } from 'react-router-dom';
import { Spaces } from '@/api/types/activities';
import { intToFloat } from '@/utils/intToFloat';
import { formatPrice } from '@/utils/formatPrice';

type SpaceCardProps = { item: Pick<Spaces, Exclude<keyof Spaces, 'address' | 'createdAt' | 'updatedAt'>> };

export default function HotSpaceCard({ item }: SpaceCardProps) {
  return (
    <div className="hot-space-card-container">
      <Link to={`/space/${item.id}`}>
        <div className="hot-space-card-background" />
        <div className="hot-space-card-image-wrapper">
          <img src={item.bannerImageUrl} alt="공간 배너이미지" className="hot-space-card-banner-image" />
        </div>
        <div className="hot-space-card-contents-wrapper">
          <div className="hot-space-card-rating">
            <img src="/assets/icons/icon-star.svg" alt="별점 아이콘" />
            <p>{intToFloat(item.rating, 1)}</p>
            <p> ({item.reviewCount})</p>
          </div>
          <h1>{item.title}</h1>
          <div className="hot-space-card-price">
            <p>₩ {formatPrice(item.price)}</p>
            <span> / 인</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
