import './style.scss';
import { NotificationContentsType } from '@/api/types/notifications';
import calculateElapsedTime from '@/utils/calculateElapsedTime';

type NotificationProps = { notifications: NotificationContentsType; onDelete: (id: number) => void };

export default function Notification({ notifications, onDelete }: NotificationProps) {
  const contentContainsApproval = notifications.content.includes('승인');
  const contentContainsRejection = notifications.content.includes('거절');

  const alertClassName = contentContainsApproval
    ? 'my-notifications-modal-alert blue-background'
    : contentContainsRejection
      ? 'my-notifications-modal-alert red-background'
      : 'my-notifications-modal-alert';

  const handleDeleteClick = () => {
    onDelete(notifications.id);
  };

  return (
    <div className="my-notifications-modal-wrapper">
      <div className="my-notifications-modal-header">
        <div className={alertClassName} />
        <img src="/assets/icons/icon-closed-light.svg" alt="알림 삭제하기 버튼" onClick={handleDeleteClick} />
      </div>
      <p className="my-notifications-modal-content">{notifications.content}</p>
      <p className="my-notifications-modal-time">{calculateElapsedTime(notifications.createdAt)}</p>
    </div>
  );
}
