interface CalendarCellsProps {
  currentMonth: Date;
  onChange: (date: Date) => void;
  size: CalendarSize;
  tileContent: (date: Date) => JSX.Element | null;
}

interface CalendarHeaderProps {
  currentMonth: Date;
  nextMonth: () => void;
  prevMonth: () => void;
  size: CalendarSize;
}

interface CalendarProps {
  size: CalendarSize;
  onChange: (date: Date) => void;
  onChangeMonth?: (month: Date) => void;
  tileContent: (date: Date) => JSX.Element | null;
}

type CalendarSize = 'small' | 'large';

interface ReservationInformationChipProps {
  status?: ReservationStatus;
}

type ReservationStatus = '승인' | '완료' | '예약';
