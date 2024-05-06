import { Schedule } from '@/api/types/myActivities';
import { useState } from 'react';
import DateInput from './DateInput';
import './style.scss';
import TimeDropdown from './TimeDropdown';

import toast from '@/utils/toast';
import { compareTime, isNonOverlappingSchedule } from '@/utils/compareTime';

interface SchedulesProps {
  schedules: Schedule[];
  setSchedules: (value: Schedule[]) => void;
}

export default function Schedules({ schedules, setSchedules }: SchedulesProps) {
  const [inputValue, setInputValue] = useState<Schedule>({ date: '', startTime: '00:00', endTime: '00:00' });

  const handleStartTime = (value: string) => {
    setInputValue((prev) => ({ ...prev, startTime: value }));
  };

  const handleEndTime = (value: string) => {
    setInputValue((prev) => ({ ...prev, endTime: value }));
  };

  const handleScheduleButton = () => {
    if (!inputValue.date) {
      toast.warning('날짜를 확인해 주세요!');
      return;
    } else if (!compareTime(inputValue.startTime, inputValue.endTime)) {
      toast.warning('시간을 확인해 주세요!');
      return;
    } else if (!isNonOverlappingSchedule(schedules, inputValue)) {
      toast.warning('겹치는 예약 가능 시간대가 존재합니다!');
      return;
    }
    setSchedules([...schedules, inputValue]);
  };

  const handleDeleteSchedule = (index: number) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
  };

  return (
    <div>
      <div className="schedule-input-box">
        <DateInput preViewValue={inputValue} setPreViewValue={setInputValue} />
        <div className="start-time-input-box">
          <div className="start-time-title">시작 시간</div>
          <TimeDropdown onClick={handleStartTime} />
        </div>
        <div className="between-time">~</div>
        <div className="end-time-input-box">
          <div className="end-time-title">종료 시간</div>
          <TimeDropdown onClick={handleEndTime} />
        </div>
        <button type="button" className="button-with-image" onClick={handleScheduleButton}>
          <img src="/assets/icons/icon-schedule-plus.svg" alt="스케줄 추가하기" />
        </button>
      </div>
      <hr className="schedule-hr" />
      {schedules.length > 0 && (
        <ul className="set-schedules-box">
          {schedules.map((schedule, index) => (
            <li className="set-schedule" key={Date.now() + index}>
              <div className="set-date">{schedule.date}</div>
              <div className="set-start-time">{schedule.startTime}</div>
              <div className="between-time">~</div>
              <div className="set-end-time">{schedule.endTime}</div>
              <button className="button-with-image" onClick={() => handleDeleteSchedule(index)}>
                <img src="/assets/icons/icon-schedule-minus.svg" alt="스케줄 삭제하기" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
