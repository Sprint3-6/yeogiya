import { Schedule } from '@/api/types/myActivities';

export function compareTime(startTime: string, endTime: string): boolean {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  if (startHour < endHour) {
    return true;
  } else if (startHour === endHour && startMinute < endMinute) {
    return true;
  }

  return false;
}

export function isNonOverlappingSchedule(existingSchedules: Schedule[], newSchedule: Schedule): boolean {
  // 새로운 스케줄의 시작시간과 종료시간을 추출합니다.
  const { startTime: newStartTime, endTime: newEndTime, date: newDate } = newSchedule;
  console.log(existingSchedules);
  // 기존 스케줄들을 순회하면서 겹치는 시간이 있는지 확인합니다.
  for (const existingSchedule of existingSchedules) {
    // 기존 스케줄의 시작시간과 종료시간을 추출합니다.
    const { startTime: existingStartTime, endTime: existingEndTime, date: existingDate } = existingSchedule;

    // 새로운 스케줄과 비교할 날짜가 기존 스케줄 중 첫 번째 스케줄의 날짜와 같은지 확인합니다.
    if (newDate !== existingDate) {
      console.log('데이트 안겹침');
      continue;
    }
    // 겹치는 시간이 있는지 확인합니다.
    if (
      (newStartTime >= existingStartTime && newStartTime < existingEndTime) || // 새로운 시작시간이 기존 스케줄 사이에 있는 경우
      (newEndTime > existingStartTime && newEndTime <= existingEndTime) || // 새로운 종료시간이 기존 스케줄 사이에 있는 경우
      (newStartTime <= existingStartTime && newEndTime >= existingEndTime) // 새로운 스케줄이 기존 스케줄을 포함하는 경우
    ) {
      // 겹치는 시간이 있으면 false를 반환합니다.
      return false;
    }
  }
  return true;
  // 겹치는 시간이 없으면 true를 반환합니다.
}
