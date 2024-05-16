import './style.scss';
import { useEffect, useRef, useState } from 'react';
import { NotificationsType, MyNotificationsProps } from '@/api/types/notifications';
import getMyNotifications from '@/api/getMyNotifications';
import instance from '@/api/instance/defaultInstance';
import Notification from './components/Notification';
import useIntersectionObserver from '@/hooks/useIntersectionObserver/useIntersectionObserver';

export default function MyNotifications({ onClose }: MyNotificationsProps) {
  const [myNotiInfo, setMyNotiInfo] = useState<NotificationsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false); // 요청 중 상태 추적
  const cursorId = useRef<number | null>(null); // 커서 ID 초기화

  const getMoreNoti = async () => {
    // 요청 중이면 새로운 요청을 방지
    if (isFetching || cursorId.current === null) {
      return;
    }

    setIsFetching(true); // 요청 중 상태로 설정

    try {
      const data = await getMyNotifications(2, cursorId.current);
      if (data && data.notifications) {
        setMyNotiInfo((prevInfo) => {
          if (!prevInfo) return data;

          const updatedNotifications = [...prevInfo.notifications, ...data.notifications];
          return {
            ...prevInfo,
            notifications: updatedNotifications,
            totalCount: data.totalCount,
          };
        });

        // 마지막 알림의 ID를 커서 ID로 업데이트
        if (data.notifications.length > 0) {
          const lastNotification = data.notifications[data.notifications.length - 1];
          cursorId.current = lastNotification.id;
        }
      }
    } catch (error) {
      console.error('알림 데이터 오류:', error);
    } finally {
      setIsFetching(false); // 요청 완료
    }
  };

  const { sentinelRef } = useIntersectionObserver(getMoreNoti);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getMyNotifications(3, cursorId.current);
        if (data) {
          setMyNotiInfo(data);
          cursorId.current = data.notifications[data.notifications.length - 1]?.id || null;
        }
      } catch (error) {
        console.error('알림 데이터 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await instance.delete(`my-notifications/${notificationId}`);
      setMyNotiInfo((prevInfo) => {
        if (!prevInfo) return prevInfo;

        const updatedNotifications = prevInfo.notifications.filter(
          (notification) => notification.id !== notificationId,
        );
        return {
          ...prevInfo,
          notifications: updatedNotifications,
          totalCount: prevInfo.totalCount - 1,
        };
      });
    } catch (err) {
      console.error('알림 삭제 오류:', err);
    }
  };

  const notificationCount = isLoading ? '' : `알림 ${myNotiInfo?.totalCount || 0}개`;

  return (
    <div className="notifications-wrapper">
      <div className="notifications-header">
        <span>{notificationCount}</span>
        <img src="/assets/icons/icon-closed.svg" alt="알림창 닫기 버튼" onClick={onClose} />
      </div>
      <div className={`notifications-content ${myNotiInfo && myNotiInfo.totalCount > 0 ? 'has-notifications' : ''}`}>
        {myNotiInfo && myNotiInfo.totalCount === 0 ? (
          <span>알림이 없습니다.</span>
        ) : (
          <>
            {myNotiInfo?.notifications.map((notification) => (
              <Notification key={notification.id} notifications={notification} onDelete={handleDeleteNotification} />
            ))}
            <div ref={sentinelRef}></div>
          </>
        )}
      </div>
    </div>
  );
}
