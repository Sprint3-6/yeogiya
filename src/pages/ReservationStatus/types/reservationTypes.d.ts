type ReservationChip = 'pending' | 'confirmed' | 'completed';

interface ReservationInformationProps {
  activityId: number;
  reservationChip?: ReservationChip;
  selectedDate: Date;
  status?: ReservationStatus;
}

type UpdateReservationStatus = 'pending' | 'confirmed' | 'declined';

interface UpdateReservationStatusProps {
  status?: UpdateReservation;
}
