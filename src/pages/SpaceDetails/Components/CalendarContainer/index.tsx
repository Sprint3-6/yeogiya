import { isSameDate } from '@/utils/calendarUtils';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DetailType, ScheduleType } from '../../Types/DetailTypes';
import getOpenedSchedule from '@/api/getOpenedSchedule';
import useCalendar from '@/components/Calendar/hooks/useCalendar';
import Button from '@/components/Button';
import postReservation from '@/api/postReservation';
import Loading from '@/pages/Loading';

interface A {
  id: string | undefined;
  detail: DetailType | undefined;
}

export default function CalendarContainer({ id, detail }: A) {
  const { Calendar, selectedDate, setSelectedDate } = useCalendar();
  const [schedule, SetSchedule] = useState<ScheduleType[]>();
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [howMany, setHowMany] = useState<number>(1);
  const [loading, isLoading] = useState(false);

  const setOpenedSchedule = async () => {
    const scheduleData = await getOpenedSchedule(id, year, month);
    SetSchedule(scheduleData);
  };

  const handleMonthChange = (month: Date) => {
    setSelectedSchedule(null);
    setYear(month.getFullYear().toString());
    setMonth((month.getMonth() + 1).toString().padStart(2, '0'));
  };

  const handleSelectedSchedule = (id: number) => {
    setSelectedSchedule(id);
  };

  const handleHowManyCustomer = (type: string) => {
    if (type === '-' && howMany !== 1) {
      setHowMany((state) => state - 1);
    } else if (type === '+') {
      setHowMany((state) => state + 1);
    }
  };

  const handleSubmitReservation = async () => {
    isLoading(true);
    await postReservation(id, selectedSchedule, howMany);
    isLoading(false);
  };

  useEffect(() => {
    setOpenedSchedule();
  }, [month]);

  useEffect(() => {
    const days = document.getElementsByClassName('calendar-date-box');

    for (let x = 0; x < days.length; x++) {
      schedule?.map((item) => {
        if (item.date.slice(8, 10) === days[x].innerHTML.padStart(2, '0')) {
          days[x].classList.add('booked-date');
        }
      });
    }
  });

  return (
    <div className="space-detail-container-calendar">
      {loading && <Loading />}
      <h2>
        ₩ {detail?.price.toLocaleString()} <span>/ 인</span>
      </h2>

      <div className="calendar-box">
        <h3>날짜</h3>
        <Calendar
          onChange={() => setSelectedSchedule(null)}
          onChangeMonth={handleMonthChange}
          size="small"
          tileContent={(date: Date) => {
            return (
              <div
                className={`calendar-date-box ${isSameDate(selectedDate, date) ? 'selected-date' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                {format(date, 'd')}
              </div>
            );
          }}
        />
        <h3>예약 가능한 시간</h3>
        <div>
          {schedule &&
            schedule.map(
              (schedule) =>
                selectedDate.getDate().toString().padStart(2, '0') === schedule.date.slice(8, 10) &&
                schedule.times.map((time) => (
                  <div
                    key={time.id}
                    className={`time-box ${time.id === selectedSchedule ? 'selected' : ''}`}
                    onClick={() => handleSelectedSchedule(time.id)}
                  >
                    {time.startTime}~{time.endTime}
                  </div>
                )),
            )}
        </div>
      </div>

      <div className="howmany-box">
        <h3>참여 인원 수</h3>
        <div className="howmany-box-control">
          <img src="/assets/icons/icon-minus.svg" onClick={() => handleHowManyCustomer('-')} />
          <input value={howMany} type="number" onChange={(e) => setHowMany(Math.max(1, Number(e.target.value)))} />
          <img src="/assets/icons/icon-plus.svg" onClick={() => handleHowManyCustomer('+')} />
        </div>
        <Button className="button-black" onClick={handleSubmitReservation} disabled={selectedSchedule ? false : true}>
          예약하기
        </Button>
      </div>

      <div className="total-box">
        <h3>총 합계</h3>
        <h3>₩ {detail && (detail.price * howMany).toLocaleString()}</h3>
      </div>
    </div>
  );
}
