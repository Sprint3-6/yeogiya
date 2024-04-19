import './style.scss';
import { ToastType } from './types/toastType';

export default function ToastContainer({ message, onClick, type }: ToastType) {
  const handleImgSource = () => {
    switch (type) {
      case 'success':
        return '/assets/images/toast-success.png';
      case 'warning':
        return '/assets/images/toast-warning.png';
      case 'error':
        return '/assets/images/toast-error.png';
      default:
        return '/assets/images/toast-success.png';
    }
  };

  return (
    <div id="toast" className={`toast ${type}`} onClick={onClick}>
      <img src={handleImgSource()} />
      <span>{message}</span>
    </div>
  );
}
