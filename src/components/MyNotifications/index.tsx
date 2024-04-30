import getMyNotifications from '@/api/getMyNotifications';
import { NotificationsType, MyNotificationsProps } from '@/api/types/notifications';
import { useEffect, useState } from 'react';
import './style.scss';

export default function MyNotifications({ onClose }: MyNotificationsProps) {
  const [myNotiInfo, setMyNotiInfo] = useState<NotificationsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getMyNotifications();
        setMyNotiInfo(data);
      } catch (error) {
        console.error('알림 데이터 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const notificationCount = isLoading ? '' : `알림 ${myNotiInfo?.totalCount || 0}개`;

  return (
    <div className="notifications-wrapper">
      <div className="notifications-header">
        <span>{notificationCount}</span>
        <img src="/assets/icons/icon-closed.svg" alt="알림창 닫기 버튼" onClick={onClose} />
      </div>
      <div className="notifications-content">
        {myNotiInfo?.totalCount === 0 ? <span>알림이 없습니다.</span> : <>{myNotiInfo?.notifications}</>}
      </div>
    </div>
  );
}
