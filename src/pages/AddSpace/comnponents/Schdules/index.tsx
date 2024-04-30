import { Schedule } from '@/api/types/myActivities';
import { useState } from 'react';
import DateInput from './DateInput';
import './style.scss';

interface SchedulesProps {
  schedules: Schedule[];
  setSchedules: (value: Schedule[]) => void;
}

export default function Schedules({ schedules, setSchedules }: SchedulesProps) {
  const [inputValue, setInputValue] = useState<Schedule>({ date: 'yy-mm-dd', startTime: '0', endTime: '1' });

  const handleStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, startTime: event.target.value });
  };

  const handleEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, endTime: event.target.value });
  };

  const handleScheduleButton = () => {
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
        <input className="start-time-input" value={inputValue.startTime} onChange={handleStartTime}></input>
        <input className="end-time-input" value={inputValue.endTime} onChange={handleEndTime}></input>
        <button type="button" className="button-with-image" onClick={handleScheduleButton}>
          <img src="/assets/icons/icon-schedule-plus.svg" alt="스케줄 추가하기" />
        </button>
      </div>
      {schedules.length > 0 && (
        <ul>
          {schedules.map((schedule, index) => (
            <li key={Date.now() + index}>
              년월일{schedule.date} 시작시간{schedule.startTime} 끝나는시간{schedule.endTime}
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
