import { addDays, getDaysInMonth, startOfMonth } from 'date-fns';

export interface DateWithStatus {
  date?: Date;
  status?: ReservationStatus;
}

export default function generateDates(currentMonth: Date): DateWithStatus[] {
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = startOfMonth(currentMonth);
  const startingWeekday = firstDayOfMonth.getDay();

  const datesArray: DateWithStatus[] = [];
  for (let i = 0; i < startingWeekday; i++) {
    datesArray.push({ date: undefined, status: undefined });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    datesArray.push({ date: addDays(firstDayOfMonth, i - 1), status: status[(i - 1) % status.length] });
  }
  return datesArray;
}

export const isSameDate = (selectedDate: Date, date?: Date) => {
  return (
    date?.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear()
  );
};

export const status: ReservationStatus[] = ['승인', '완료', '예약'];

export const statusMap = {
  승인: 'approve',
  완료: 'success',
  예약: 'reservation',
};
