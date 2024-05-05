import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './constants/url';
import axiosBaseQuery from './instance/axiosBaseQuery';
import { format } from 'date-fns';

enum UpdateStatus {
  declined = 0,
  confirmed = 1,
}

export const reservationStatusApi = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }), // API의 기본 URL 설정
  reducerPath: 'reservationStatusApi',
  refetchOnMountOrArgChange: true, // 컴포넌트가 마운트되거나 매개변수가 변경될 때마다 새로고침
  // 각각의 query/mutation 동작을 여기서 정의합니다.
  endpoints: (builder) => ({
    getActivityList: builder.query<MyActivities, void>({
      query: () => 'my-activities', // 내 체험 리스트 조회 엔드포인트
    }),
    // builder.query<반환타입, 매개변수타입>, builder.query는 GET 요청을 보내는 함수
    getReservationDashboard: builder.query<ReservationDashboard[], ReservationDashboardParams>({
      // activityId는 호출에서 받은 값
      query: ({ activityId, year, month }) =>
        `my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`, // 내 체험 월별 예약 현황 조회 엔드포인트
    }),
    getReservedSchedule: builder.query<ReservedSchedule[], ReservationScheduleParams>({
      query: (schedule) =>
        `my-activities/${schedule.activityId}/reserved-schedule?date=${format(schedule.date, 'yyyy-MM-dd')}`, // 내 체험 날짜별 예약 정보 조회 엔드포인트
    }),
    getTimeReservations: builder.query<TimeReservationList, TimeReservationParams>({
      query: ({ activityId, scheduleId, status }) =>
        `my-activities/${activityId}/reservations?scheduleId=${scheduleId}&status=${status}`, // 내 체험 예약 시간대별 예약 내역 조회 엔드포인트
    }),
    // mutation은 데이터 조작을 정의합니다. POST, PUT, DELETE, PATCH 등의 요청을 보낼 수 있습니다.
    updateReservationStatus: builder.mutation<UpdateReservation, { activityId: number; reservationId: UpdateStatus }>({
      query: ({ activityId, reservationId }) => ({
        url: `my-activities/${activityId}/reservation-status/${reservationId}`, // 내 체험 예약 상태 업데이트 엔드포인트
        method: 'PATCH',
      }),
    }),
  }),
});

// 정의된 endpoints를 기반으로 자동 생성됩니다. getPost => useGetPostQuery
export const {
  useGetActivityListQuery,
  useGetReservationDashboardQuery,
  useGetReservedScheduleQuery,
  useGetTimeReservationsQuery,
  useUpdateReservationStatusMutation,
} = reservationStatusApi;
