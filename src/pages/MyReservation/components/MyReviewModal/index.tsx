import './style.scss';
import MyReviewContents from '../MyReviewContents';
import { MyReservationType } from '@/api/types/myReservation';
import { formatPrice } from '@/utils/formatPrice';
import instance from '@/api/instance/defaultInstance';
import { BASE_URL } from '@/api/constants/url';
import toast from '@/utils/toast';

//TODO 데이터 불러오지 못했을 때

interface MyReviewModalProps {
  item: MyReservationType;
  onClose: () => void;
}

export default function MyReviewModal({ item, onClose }: MyReviewModalProps) {
  const handleReviewSubmit = async (rating: number, content: string) => {
    try {
      const url = `${BASE_URL}my-reservations/${item.id}/reviews`;
      const body = {
        rating: rating,
        content: content,
      };
      const response = await instance.post(url, body);
      console.log('후기 제출 완료:', response.data);
      toast.success('후기 작성이 완료되었습니다!');
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
          <h3>{item.activity.title}</h3>
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