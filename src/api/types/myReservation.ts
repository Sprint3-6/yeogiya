export type myReserVationStatusType = '예약 완료' | '예약 승인' | '예약 거절' | '예약 취소' | '이용 완료' | '';

type ReservationStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed' | '';

export interface ActivityInfo {
  id: number;
  title: string;
  bannerImageUrl: string;
}

export interface ReservationBase {
  id: number;
  teamId: string;
  userId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyReservationType extends ReservationBase {
  activity: ActivityInfo;
}
