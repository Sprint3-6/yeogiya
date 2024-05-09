import instance from './instance/defaultInstance';
import { NotificationsType } from './types/notifications';

export default async function getMyNotifications(
  size: number,
  cursorId: number | null,
): Promise<NotificationsType | null> {
  try {
    const response = await instance.get<NotificationsType>('my-notifications', {
      params: {
        cursorId: cursorId,
        size: size,
      },
    });
    return response.data;
  } catch (error) {
    console.log('알림 오류:', error);
    throw error;
  }
}
