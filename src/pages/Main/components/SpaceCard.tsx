// id: activityId 로 link 넘기기
// title: 체험 이름
// price: 가격
// raiting: 별점
// reviewCount: 리뷰개수
// bannerImageUrl: 배너이미지

import { Link } from 'react-router-dom';
import './spaceCard.scss';
import { Spaces } from '../types/spaces-type';

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
                {item.rating}
                <span> ({item.reviewCount})</span>
              </p>
            </div>
            <h1>{item.title}</h1>
          </div>
          <div className="space-card-detail-price-wrapper">
            <p>₩ {item.price}</p>
            <span>/ 인</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
