const reservationStatusFilter = (word: string | undefined) => {
  switch (word) {
    case 'pending':
      return '예약 완료';
    case 'confirmed':
      return '예약 승인';
    case 'declined':
      return '예약 거절';
    case 'canceled':
      return '예약 취소';
    case 'completed':
      return '이용 완료';
    default:
      return '';
  }
};

export default reservationStatusFilter;
