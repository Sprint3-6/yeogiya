import { NotificationContentsType } from '@/api/types/notifications';
import calculateElapsedTime from '@/utils/calculateElapsedTime';
import './notification.scss';
import instance from '@/api/instance/defaultInstance';
import { BASE_URL } from '@/api/constants/url';

type NotificationProps = { notifications: NotificationContentsType };

export default function Notification({ notifications }: NotificationProps) {
  // 알림 내용에 '승인' 또는 '거절' 단어가 포함되어 있는지 확인
  const contentContainsApproval = notifications.content.includes('승인');
  const contentContainsRejection = notifications.content.includes('거절');

  // `my-notifications-modal-alert`의 클래스를 조건부로 적용하여 배경색(알림 동그라미 색)을 설정
  const alertClassName = contentContainsApproval
    ? 'my-notifications-modal-alert blue-background'
    : contentContainsRejection
      ? 'my-notifications-modal-alert red-background'
      : 'my-notifications-modal-alert';

  const deleteNotifications = async (notificationId: number) => {
    try {
      const res = await instance.delete(`${BASE_URL}my-notifications/${notificationId}`);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleAlarmDelete = (id: number) => {
    deleteNotifications(id);
  };

  return (
    <>
      <div className="my-notifications-modal-wrapper">
        <div className="my-notifications-modal-header">
          {/* `my-notifications-modal-alert` 클래스에 조건부 배경색 클래스를 적용 */}
          <div className={alertClassName} />
          <img
            src="/assets/icons/icon-closed-light.svg"
            alt="알림 삭제하기 버튼"
            onClick={() => handleAlarmDelete(notifications.id)}
          />
        </div>
        <p className="my-notifications-modal-content">{notifications.content}</p>
        <p className="my-notifications-modal-time">{calculateElapsedTime(notifications.createdAt)}</p>
      </div>
    </>
  );
}
