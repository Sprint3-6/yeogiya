interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Reservation {
  cursorId: number;
  totalCount: number;
}

// 내 체험 리스트 조회
interface MyActivities extends Reservation {
  activities: Activity[];
}

type ReservationStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

// 내 체험 월별 예약 현황 조회
interface ReservationDashboard {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

interface ReservationDashboardParams {
  activityId: number;
  year: number;
  month: string;
}

interface ReservationScheduleParams {
  activityId: number;
  date: Date;
}

interface Count {
  declined: number;
  confirmed: number;
  pending: number;
}

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: Count;
}

interface ReservationInfo {
  id: number;
  userId: number;
  teamId: string;
  activityId: number;
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

interface ReservationMoreInfo extends ReservationInfo {
  nickname: string;
}

interface TimeReservationParams {
  activityId: number;
  scheduleId: number;
  status: UpdateReservationStatus;
}

// 내 체험 예약 시간대별 예약 내역 조회
interface TimeReservationList extends Reservation {
  reservations: ReservationMoreInfo[];
}

// 내 체험 예약 상태(승인, 거절) 업데이트
interface UpdateReservation {
  status: UpdateReservationStatus;
}
