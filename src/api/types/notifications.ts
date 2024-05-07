export interface MyNotificationsProps {
  onClose: () => void;
}

export interface NotificationsType {
  cursorId?: number;
  notifications: NotificationContentsType[];
  totalCount: number;
}

export interface NotificationContentsType {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
