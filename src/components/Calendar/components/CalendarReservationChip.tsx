import './calendarReservationChip.scss';

interface ChipProps {
  color: string;
  onClick?: () => void;
  status?: string;
}

export default function CalendarReservationChip({ color, onClick, status }: ChipProps) {
  return (
    <div className="calendar-chips-wrapper">
      <div className={`calendar-chip ${color}`} onClick={onClick}>
        {status}
      </div>
    </div>
  );
}
