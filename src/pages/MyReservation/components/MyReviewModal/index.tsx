import './style.scss';
import instance from '@/api/instance/defaultInstance';
import { MyReservationType } from '@/api/types/myReservation';
import { formatPrice } from '@/utils/formatPrice';
import toast from '@/utils/toast';
import MyReviewContents from '../MyReviewContents';

interface MyReviewModalProps {
  item: MyReservationType;
  onClose: () => void;
  handleWriteReview?: (data: MyReservationType) => void;
}

export default function MyReviewModal({ item, onClose, handleWriteReview }: MyReviewModalProps) {
  const handleReviewSubmit = async (rating: number, content: string) => {
    try {
      const url = `my-reservations/${item.id}/reviews`;
      const body = {
        rating: rating,
        content: content,
      };
      await instance.post(url, body);
      toast.success('후기 작성이 완료되었습니다!');

      if (handleWriteReview) {
        handleWriteReview({ ...item, reviewSubmitted: true });
      }

      onClose();
    } catch (error: unknown) {
      const errorMessage = '후기 작성 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    }
  };

  if (!item || !item.activity) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="review-modal-wrapper">
      <header className="review-modal-header">
        <h1>후기 작성</h1>
        <img
          src="/assets/icons/icon-closed.svg"
          alt="닫기 아이콘"
          onClick={onClose}
          className="review-modal-closed-icon"
        />
      </header>
      <div className="review-modal-space-wrapper">
        <img src={item.activity.bannerImageUrl} alt="공간 배너이미지" className="review-modal-space-image" />
        <div className="review-modal-space-info">
          <h3 className="review-modal-title">{item.activity.title}</h3>
          <span>
            {item.date} · {item.startTime} ~ {item.endTime} · {item.headCount}명
          </span>
          <span className="review-modal-space-price">₩{formatPrice(item.totalPrice)}</span>
        </div>
      </div>
      <div className="review-modal-reviews-wrapper">
        <MyReviewContents onReviewSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
}
