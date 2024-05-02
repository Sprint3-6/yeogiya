export default function compareTime(startTime: string, endTime: string): boolean {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  if (startHour < endHour) {
    return true;
  } else if (startHour === endHour && startMinute < endMinute) {
    return true;
  }

  return false;
}
