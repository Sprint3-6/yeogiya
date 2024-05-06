import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/store';
import { useModal } from '../../hooks/useModal/useModal';
import { DropDown, DropDownValue, DropdownItem } from '@/components/Dropdown';
import { DetailType, ReviewType } from './Types/DetailTypes';
import getSpaceDetail from '@/api/getSpaceDetail';
import getUserReview from '@/api/getUserReview';
import KakaoMap from '@/components/KakaoMap';
import categoryFilter from '@/utils/categoryFilter';
import ratingFilter from '@/utils/ratingFilter';
import DeleteModal from '@/pages/SpaceDetails/Components/DeleteModal';
import Loading from '../Loading';
import CalendarContainer from './Components/CalendarContainer';
import Pagination from '@/components/Pagination';
import './style.scss';

export default function SpaceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { Modal, openModal, closeModal } = useModal();
  const [detail, setDetail] = useState<DetailType>();
  const [reviews, setReviews] = useState<ReviewType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const userInfo = useAppSelector((state) => state.myInfo);
  const [imagePosition, setImagePosition] = useState(1);
  const [currentImage, setCurrentImage] = useState(1);
  const [totalImages, setTotalImages] = useState<number | undefined>(1);

  const setDetailData = async () => {
    setIsLoading(true);
    const detailData = await getSpaceDetail(id, navigate);
    setDetail(detailData);
    setIsLoading(false);
  };

  const setReviewData = async () => {
    const reviewData = await getUserReview(id, page);
    setReviews(reviewData);
  };

  const handleKebabButton = (value: DropDownValue) => {
    if (value === 'edit') {
      navigate(`/mypage/admin/edit/${id}`);
    } else if (value === 'delete') {
      openModal('delete-modal');
    }
  };

  const handleImagesGoLeft = () => {
    if (totalImages && currentImage < totalImages) {
      setImagePosition((state) => state - 375);
      setCurrentImage((state) => state + 1);
    } else {
      setImagePosition(0);
      setCurrentImage(1);
    }
  };

  const handleImagesGoRight = () => {
    if (totalImages && currentImage === 1) {
      setImagePosition(375 * -totalImages + 375);
      setCurrentImage(totalImages);
    } else {
      setImagePosition((state) => state + 375);
      setCurrentImage((state) => state - 1);
    }
  };

  useEffect(() => {
    setDetailData();
    setTotalImages(detail?.subImages.length ? detail.subImages.length + 1 : 1);
  }, [detail?.userId]);

  useEffect(() => {
    setReviewData();
  }, [page]);

  useEffect(() => {
    const handleResize = () => {
      const windowSize = window.innerWidth;
      if (windowSize > 375) {
        setImagePosition(0);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <Loading type="loading-screen" />;
  }

  return (
    <div className="space-detail-wrapper">
      <section className="space-detail-container">
        <div className="space-detail-container-header">
          <h3>{categoryFilter(detail?.category)}</h3>
          <h1>{detail?.title}</h1>
          <div>
            <img src="/assets/icons/icon-star.svg" />
            <h2>{`${detail && Math.floor(detail.rating * 10) / 10} (${detail?.reviewCount})`}</h2>
            <img src="/favicon.svg" />
            <h3>{detail?.address}</h3>
          </div>

          {userInfo.id === detail?.userId && (
            <DropDown id="space-detail-kebab" image="/assets/icons/icon-meatball.svg" onClickItem={handleKebabButton}>
              <DropdownItem value="edit">수정하기</DropdownItem>
              <DropdownItem value="delete">삭제하기</DropdownItem>
            </DropDown>
          )}
        </div>

        <figure className="space-detail-container-pictures">
          <div className="images" style={{ transform: `translateX(${imagePosition}px)` }}>
            <img src={detail?.bannerImageUrl} />
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`images ${detail?.subImages[index] ? '' : 'empty-image'}`}
              style={{ transform: `translateX(${imagePosition}px)` }}
            >
              {
                <img
                  src={detail?.subImages[index] ? detail.subImages[index].imageUrl : '/assets/logos/logo-icon.svg'}
                />
              }
            </div>
          ))}
          <img src="/assets/icons/icon-left-slider.svg" className="slider left-button" onClick={handleImagesGoRight} />
          <img src="/assets/icons/icon-right-slider.svg" className="slider right-button" onClick={handleImagesGoLeft} />
        </figure>

        <div className={`space-detail-container-body ${userInfo.id === detail?.userId ? 'no-calendar' : ''}`}>
          <section className="body-description">
            <h2>공간 설명</h2>
            <p>{detail?.description}</p>
          </section>

          <section className="body-map">
            <KakaoMap address={detail?.address} title={detail?.title} />
            <div>
              <img src="/favicon.svg" />
              <h3>{detail?.address}</h3>
            </div>
          </section>

          <section className="body-review">
            <h2>후기</h2>
            <div className="review-scoreboard">
              <h3>{detail && Math.floor(detail.rating * 10) / 10}</h3>
              <h4>
                {detail?.reviewCount === 0
                  ? `첫번째 후기를 남겨주세요!`
                  : ratingFilter(detail && Number(detail.rating))}
              </h4>
              <div>
                <img src="/assets/icons/icon-star.svg" />
                <h5>{detail?.reviewCount}개 후기</h5>
              </div>
            </div>
            {reviews &&
              reviews.map((review) => (
                <div className="review-detail" key={review.id}>
                  <img
                    src={
                      review.user.profileImageUrl ? review.user.profileImageUrl : '/assets/images/profile-default.png'
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

          <nav className="body-pagination">
            <Pagination totalCount={detail?.reviewCount} size={3} page={page} setPage={setPage} />
          </nav>
          <div className="bottom-space"> </div>
        </div>

        {userInfo.id !== detail?.userId && <CalendarContainer id={id} detail={detail} />}
      </section>

      <Modal name="delete-modal">
        <DeleteModal closeModal={closeModal} title={detail?.title} id={id} />
      </Modal>
    </div>
  );
}
