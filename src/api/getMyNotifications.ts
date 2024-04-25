import { BASE_URL } from './constants/url';
import instance from './instance/defaultInstance';
import { NotificationsType } from './types/notifications';

export default async function getMyNotifications(): Promise<NotificationsType | null> {
  try {
    const response = await instance.get(`${BASE_URL}my-notifications?size=3`);
    console.log(response);
    return response.data as NotificationsType;
  } catch (error) {
    console.log(error);
    return null;
  }
}
