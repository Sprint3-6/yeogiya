export interface NotificationsType {
  cursorId?: number;
  notifications: [
    {
      id: number;
      teamId: string;
      userId: number;
      content: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
    },
  ];
  totalCount: number;
}
