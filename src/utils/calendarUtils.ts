import { addDays, getDaysInMonth, startOfMonth } from 'date-fns';

export interface DateWithStatus {
  date?: Date;
}

export default function generateDates(currentMonth: Date): DateWithStatus[] {
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = startOfMonth(currentMonth);
  const startingWeekday = firstDayOfMonth.getDay();

  const datesArray: DateWithStatus[] = [];
  for (let i = 0; i < startingWeekday; i++) {
    datesArray.push({ date: undefined });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    datesArray.push({ date: addDays(firstDayOfMonth, i - 1) });
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

export const statusChips: ReservationChip[] = ['pending', 'confirmed', 'completed'];

export const statusMap = {
  pending: 'reservation',
  confirmed: 'approve',
  completed: 'success',
};

export const translateMap = {
  pending: '예약',
  confirmed: '승인',
  completed: '완료',
  declined: '거절',
};
