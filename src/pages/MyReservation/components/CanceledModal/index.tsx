import { MyReservationType } from '@/api/types/myReservation';
import Button from '@/components/Button';
import { formatPrice } from '@/utils/formatPrice';
import './style.scss';
import toast from '@/utils/toast';

interface CanceledModalProp {
  item: MyReservationType;
  onClose: () => void;
  handleCancelReservation?: (reservationId: number) => Promise<void>;
}

export default function CanceledModal({ item, onClose, handleCancelReservation }: CanceledModalProp) {
  const handleCancel = async () => {
    if (handleCancelReservation) {
      await handleCancelReservation(item.id);
    }
    toast.warning('예약이 취소되었습니다');
    onClose();
  };

  return (
    <div className="canceled-modal-container">
      <img src="/assets/icons/icon-check.svg" alt="체크 아이콘" className="canceled-modal-check-icon" />
      <h3>해당 예약을 취소하시겠어요?</h3>
      <div className="canceled-modal-space-wrapper">
        <img src={item.activity.bannerImageUrl} alt="공간 배너이미지" className="canceled-modal-space-image" />
        <div className="canceled-modal-space-info">
          <h3>{item.activity.title}</h3>
          <span className="canceled-modal-space-date">
            {item.date} · {item.startTime} ~ {item.endTime}
          </span>
          <span>
            인원 <span className="canceled-modal-space-count">{item.headCount}</span>명
          </span>
          <span className="canceled-modal-space-price">₩ {formatPrice(item.totalPrice)}</span>
        </div>
      </div>
      <div className="canceled-modal-button-wrapper">
        <Button
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onClose();
          }}
          className="button-white canceled-modal-button"
        >
          아니오
        </Button>
        <Button
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleCancel();
          }}
          className="button-black canceled-modal-button"
        >
          취소하기
        </Button>
      </div>
    </div>
  );
}
