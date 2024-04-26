import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useModal } from '../../hooks/useModal/useModal';
import { useAppSelector } from '@/redux/store/store';
import { DetailType, ReviewType } from './Types/DetailTypes';
import getSpaceDetail from '@/api/getSpaceDetail';
import categoryFilter from '@/utils/categoryFilter';
import ratingFilter from '@/utils/ratingFilter';
// import Temp from '../../components/temp';
import './style.scss';
import KakaoMap from '@/components/KakaoMap';
import getUserReview from '@/api/getUserReview';

export default function SpaceDetails() {
  const { id } = useParams();
  // const { Modal, openModal, closeModal } = useModal();
  const [detail, setDetail] = useState<DetailType>();
  const [reviews, setReviews] = useState<ReviewType[]>();
  const [rating, setRating] = useState<number>(0);

  const userInfo = useAppSelector((state) => state.myInfo);

  // console.log(userInfo);

  const setSpaceDetail = async () => {
    const detailData = await getSpaceDetail(id);
    setDetail(detailData);
  };

  const setReview = async () => {
    const reviewData = await getUserReview(id, 1);
    setReviews(reviewData);
  };

  useEffect(() => {
    setSpaceDetail();
    setReview();
    setRating(Math.floor(Number(detail?.rating) * 10) / 10);
  }, [detail?.userId]);

  return (
    <div className="space-detail-wrapper">
      <section className="space-detail-container">
        <div className="space-detail-container-header">
          <h3>{categoryFilter(detail?.category)}</h3>
          <h1>{detail?.title}</h1>
          <div>
            <img src="/public/assets/icons/icon-star.svg" />
            <h2>{`${rating} (${detail?.reviewCount})`}</h2>
            <img src="/favicon.svg" />
            <h3>{detail?.address}</h3>
          </div>
          {detail?.userId === userInfo.id && (
            <img src="/public/assets/icons/icon-meatball.svg" className="space-detail-kebab" />
          )}
        </div>

        <figure className="space-detail-container-pictures">
          <div>
            <img src={detail?.bannerImageUrl} />
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={detail?.subImages[index] ? '' : 'empty-image'}>
              {
                <img
                  src={
                    detail?.subImages[index] ? detail.subImages[index].imageUrl : '/public/assets/logos/logo-icon.svg'
                  }
                />
              }
            </div>
          ))}
        </figure>

        <section className="space-detail-container-description">
          <h2>공간 설명</h2>
          <p>{detail?.description}</p>
        </section>

        <section className="space-detail-container-map">
          <KakaoMap address={detail?.address} title={detail?.title} />
          <div>
            <img src="/favicon.svg" />
            <h3>{detail?.address}</h3>
          </div>
        </section>

        <section className="space-detail-container-review">
          <h2>후기</h2>
          <div className="review-scoreboard">
            <h3>{rating.toString()}</h3>
            <h4>{ratingFilter(rating)}</h4>
            <div>
              <img src="/public/assets/icons/icon-star.svg" />
              <h5>{detail?.reviewCount}개 후기</h5>
            </div>
          </div>
          {reviews &&
            reviews.map((review) => (
              <div className="review-detail" key={review.id}>
                <img
                  src={
                    review.user.profileImageUrl
                      ? review.user.profileImageUrl
                      : '/public/assets/images/profile-default.png'
                  }
                />
                <div>
                  <h2>{review.user.nickname}</h2>
                  <h3>|</h3>
                  <h4>{review.updatedAt.slice(0, 10)}</h4>
                </div>
                <p>{review.content}</p>
              </div>
            ))}
        </section>

        <nav className="space-detail-container-pagination">페이지네이션</nav>
        <div className="bottom-space"> </div>
        {/* <button onClick={() => openModal('a')}>모달</button> */}
      </section>

      {/* <Modal name="a">
        <Temp closeModal={closeModal} />
      </Modal> */}
    </div>
  );
}
