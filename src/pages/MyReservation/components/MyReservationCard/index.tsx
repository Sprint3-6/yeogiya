import { MyReservationType } from '@/api/types/myReservation';
import reservationStatusFilter from '@/utils/reservationStatusFilter';
import { useModal } from '@/hooks/useModal/useModal';
import MyReviewModal from '../MyReviewModal';
import { formatPrice } from '@/utils/formatPrice';
import Button from '@/components/Button';
import './style.scss';

interface MyReservationCardProps {
  data: MyReservationType;
  // 예약 취소 버튼 클릭 이벤트 처리 함수
  handleCancelReservation?: (reservationId: number) => Promise<void>;
  handleWriteReview?: (data: MyReservationType) => void;
}

export default function MyReservationCard({ data, handleCancelReservation }: MyReservationCardProps) {
  const { Modal, openModal, closeModal } = useModal();
  // data.activity와 data.activity.bannerImageUrl의 존재 여부 확인
  if (!data.activity) {
    // 데이터가 존재하지 않을 경우 에러 메시지를 출력하거나 기본값을 사용
    return <div>아직 예약한 공간이 없어요</div>;
  }

  return (
    <>
      <div className="my-space-card-box">
        <div className="my-space-card-img-box">
          <img className="my-space-card-img" src={data.activity.bannerImageUrl} alt="공간 이미지" />
        </div>
        <div className="my-space-card-imf">
          <p>{reservationStatusFilter(data.status)}</p>
          <h2 className="my-space-card-title no-margin">{data.activity.title}</h2>
          <span>
            {data.date} · {data.startTime} ~ {data.endTime} · {data.headCount}명
          </span>
          <div className="my-space-card-price">
            <p>￦{formatPrice(data.totalPrice)}</p>
            {/* data.status가 "pending"일 때 예약 취소 버튼 표시 */}
            {data.status === 'pending' && (
              <Button
                className="my-reservation-button button-black"
                onClick={() => handleCancelReservation && handleCancelReservation(data.id)}
              >
                예약 취소
              </Button>
            )}

            {/* data.status가 "completed"일 때 후기 작성 버튼 표시 */}
            {data.status === 'completed' && (
              <>
                <Button
                  className={`my-reservation-button ${!data.reviewSubmitted ? 'button-black' : ''}`}
                  onClick={() => openModal('review')}
                  disabled={data.reviewSubmitted}
                >
                  후기작성
                </Button>
                <Modal name="review">
                  <div className="review-modal-container">
                    <MyReviewModal item={data} onClose={closeModal} />
                  </div>
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
