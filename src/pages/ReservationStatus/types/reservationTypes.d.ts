type ReservationChip = 'pending' | 'confirmed' | 'completed';

interface ReservationInformationProps {
  selectedDate: Date;
  status?: ReservationStatus;
  chip?: ReservationChip;
  activityId: number;
}

type UpdateReservationStatus = 'pending' | 'confirmed' | 'declined';

interface UpdateReservationStatusProps {
  status?: UpdateReservation;
}
