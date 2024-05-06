import Button from '@/components/Button';
import './style.scss';

interface ErrorModalProps {
  onClose: () => void;
}

export default function ErrorModal({ onClose }: ErrorModalProps) {
  return (
    <div className="error-wrapper">
      <img src="/assets/logos/logo-notFound.svg" alt="로고" className="error-logo" />
      <div className="error-title">ERROR</div>
      <div className="error-message">빈 공간입니다. </div>
      <Button children="뒤로 가기" type="button" onClick={onClose} className="button-black error-button" />
    </div>
  );
}
