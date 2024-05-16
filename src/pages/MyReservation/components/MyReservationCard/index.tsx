import { Link } from 'react-router-dom';
import { MyReservationType } from '@/api/types/myReservation';
import reservationStatusFilter from '@/utils/reservationStatusFilter';
import { useModal } from '@/hooks/useModal/useModal';
import MyReviewModal from '../MyReviewModal';
import Button from '@/components/Button';
import './style.scss';
import { formatPrice } from '@/utils/formatPrice';
import CanceledModal from '../CanceledModal';

interface MyReservationCardProps {
  data: MyReservationType;
  handleCancelReservation?: (reservationId: number) => Promise<void>;
}

export default function MyReservationCard({ data, handleCancelReservation }: MyReservationCardProps) {
  const { Modal, openModal, closeModal } = useModal();

  const statusClassName = `reservation-status ${data.status}`;

  return (
    <Link to={`/space/${data.activity.id}`}>
      <div className="my-space-card-box">
        <div className="my-space-card-img-box">
          <img className="my-space-card-img" src={data.activity.bannerImageUrl} alt="공간 이미지" />
        </div>
        <div className="my-space-card-imf">
          <p className={statusClassName}>{reservationStatusFilter(data.status)}</p>
          <h2 className="my-reservation-card-title no-margin">{data.activity.title}</h2>
          <span>
            {data.date} · {data.startTime} ~ {data.endTime} · {data.headCount}명
          </span>
          <div className="my-space-card-price">
            <p>₩{formatPrice(data.totalPrice)}</p>

            {/* data.status가 "pending"일 때 예약 취소 버튼 표시 */}
            {data.status === 'pending' && (
              <>
                <Button
                  className="my-reservation-button button-black"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    openModal('reservation-canceled');
                  }}
                >
                  예약 취소
                </Button>
                <Modal name="reservation-canceled">
                  <div>
                    <CanceledModal item={data} handleCancelReservation={handleCancelReservation} onClose={closeModal} />
                  </div>
                </Modal>
              </>
            )}

            {/* data.status가 "completed"일 때 후기 작성 버튼 표시 */}
            {data.status === 'completed' && (
              <>
                <Button
                  className={`my-reservation-button ${!data.reviewSubmitted ? 'button-black' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    openModal('review');
                  }}
                  disabled={data.reviewSubmitted}
                >
                  후기작성
                </Button>
                <Modal name="review" classNameModal="review-modal-container">
                  <div className="review-modal-wrapper" onClick={(event) => event.stopPropagation()}>
                    <MyReviewModal
                      item={data}
                      onClose={closeModal}
                      handleWriteReview={(updatedData: MyReservationType) => {
                        data.reviewSubmitted = updatedData.reviewSubmitted;
                      }}
                    />
                  </div>
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
