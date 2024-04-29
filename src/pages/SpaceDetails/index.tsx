import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/store/store';
import { useModal } from '../../hooks/useModal/useModal';
import { DropDown, DropdownItem } from '@/components/Dropdown';
import { DetailType, ReviewType } from './Types/DetailTypes';
import { isSameDate } from '@/utils/calendarUtils';
import { format } from 'date-fns';
import Calendar from '@/components/Calendar';
import getSpaceDetail from '@/api/getSpaceDetail';
import getUserReview from '@/api/getUserReview';
import getOpenedSchedule from '@/api/getOpenedSchedule';
import KakaoMap from '@/components/KakaoMap';
import categoryFilter from '@/utils/categoryFilter';
import ratingFilter from '@/utils/ratingFilter';
import DeleteModal from '@/pages/SpaceDetails/Components/DeleteModal';
import Loading from '../Loading';
import './style.scss';
import Button from '@/components/Button';

export default function SpaceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { Modal, openModal, closeModal } = useModal();
  const [detail, setDetail] = useState<DetailType>();
  const [reviews, setReviews] = useState<ReviewType[]>();
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedule, SetSchedule] = useState();
  const [howMany, setHowMany] = useState<number>(1);
  const userInfo = useAppSelector((state) => state.myInfo);
  // console.log(userInfo);

  const setSpaceDetail = async () => {
    setIsLoading(true);
    const detailData = await getSpaceDetail(id, navigate);
    setDetail(detailData);
    setIsLoading(false);
  };

  const setReview = async () => {
    const reviewData = await getUserReview(id, 1);
    setReviews(reviewData);
  };

  const setOpenedSchedule = async () => {
    const year = selectedDate.toString().slice(11, 15);
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const scheduleData = await getOpenedSchedule(id, year, month);
    SetSchedule(scheduleData);
    console.log(schedule);
  };

  const handleKebabButton = (value: string) => {
    if (value === 'edit') {
      navigate(`/mypage/admin/edit/${id}`);
    } else if (value === 'delete') {
      openModal('a');
    }
  };

  const handleDateChange = () => {
    console.log(selectedDate);
  };

  const handleHowManyCustomer = (type: string) => {
    if (type === '-' && howMany !== 1) {
      setHowMany((state) => state - 1);
    } else if (type === '+') {
      setHowMany((state) => state + 1);
    }
  };

  useEffect(() => {
    setSpaceDetail();
    setReview();
    setOpenedSchedule();
    setRating(Math.floor(Number(detail?.rating) * 10) / 10);
  }, [detail?.userId]);

  return (
    <div className="space-detail-wrapper">
      {isLoading && <Loading />}
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

          {userInfo.id === detail?.userId && (
            <DropDown
              id="space-detail-kebab"
              image="/public/assets/icons/icon-meatball.svg"
              onClickItem={handleKebabButton}
            >
              <DropdownItem value="edit">수정하기</DropdownItem>
              <DropdownItem value="delete">삭제하기</DropdownItem>
            </DropDown>
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

        <div className="space-detail-container-body">
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

          <nav className="body-pagination">페이지네이션</nav>
          <div className="bottom-space"> </div>
        </div>
        <div className="space-detail-container-calendar">
          <h2>
            ₩ {detail?.price.toLocaleString()} <span>/ 인</span>
          </h2>

          <div className="calendar-box">
            <h3>날짜</h3>
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              size="small"
              tileContent={(date: Date) => {
                return (
                  <div
                    className={`calendar-date-box ${isSameDate(selectedDate, date) ? 'selected-date' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {format(date, 'd')}
                  </div>
                );
              }}
            />
            <h3>예약 가능한 시간</h3>
          </div>

          <div className="howmany-box">
            <h3>참여 인원 수</h3>
            <div className="howmany-box-control">
              <img src="/assets/icons/icon-minus.svg" onClick={() => handleHowManyCustomer('-')} />
              <input value={howMany} type="number" onChange={(e) => setHowMany(Math.max(1, Number(e.target.value)))} />
              <img src="/assets/icons/icon-plus.svg" onClick={() => handleHowManyCustomer('+')} />
            </div>
            <Button className="button-black">예약하기</Button>
          </div>

          <div className="total-box">
            <h3>총 합계</h3>
            <h3>₩ {detail && (detail.price * howMany).toLocaleString()}</h3>
          </div>
        </div>
      </section>

      <Modal name="a">
        <DeleteModal closeModal={closeModal} title={detail?.title} id={id} />
      </Modal>
    </div>
  );
}
