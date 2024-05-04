import { isSameDate } from '@/utils/calendarUtils';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ScheduleType } from '../../Types/DetailTypes';
import { useModal } from '@/hooks/useModal/useModal';
import { CalendarContainerType } from '../../Types/DetailTypes';
import getOpenedSchedule from '@/api/getOpenedSchedule';
import useCalendar from '@/components/Calendar/hooks/useCalendar';
import Button from '@/components/Button';
import postReservation from '@/api/postReservation';
import Loading from '@/pages/Loading';
import './style.scss';
//import CalendarTablet from '../CalendarTablet(Temp)';

export default function CalendarContainer({ id, detail }: CalendarContainerType) {
  const { Modal, openModal, closeModal } = useModal();
  const { Calendar, selectedDate, setSelectedDate } = useCalendar();
  const [schedule, SetSchedule] = useState<ScheduleType[]>();
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [howMany, setHowMany] = useState<number>(1);
  const [loading, isLoading] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState<string>();

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
    await postReservation(Number(id), selectedSchedule, howMany);
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
    <>
      <div className="space-detail-container-calendar">
        {loading && <Loading />}
        <h2>
          ₩ {detail?.price.toLocaleString()} <span>/ 인</span>
        </h2>

        <div className="calendar-box">
          <h3>날짜</h3>
          <h4
            onClick={() => {
              openModal('calendar-tablet');
            }}
          >
            {selectedDateString ? selectedDateString : '날짜 선택하기'}
          </h4>

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
                      className={`time-box time-box-pc ${time.id === selectedSchedule ? 'selected' : ''}`}
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

        <Modal name="calendar-tablet" classNameModal="no-animation">
          <aside className="calendar-tablet">
            <div className="calendar-tablet-header">
              <h3>날짜</h3>
              <img
                src="/assets/icons/icon-closed.svg"
                onClick={() => {
                  closeModal();
                  setSelectedSchedule(null);
                  setSelectedDate(new Date());
                  setSelectedDateString('');
                }}
              />
            </div>
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
            <div className="time-box-parent">
              {schedule &&
                schedule.map(
                  (schedule) =>
                    selectedDate.getDate().toString().padStart(2, '0') === schedule.date.slice(8, 10) &&
                    schedule.times.map((time) => (
                      <div
                        key={time.id}
                        className={`time-box ${time.id === selectedSchedule ? 'selected' : ''}`}
                        onClick={() => {
                          handleSelectedSchedule(time.id);
                          setSelectedDateString(`${schedule.date} ${time.startTime} ~ ${time.endTime}`);
                        }}
                      >
                        {time.startTime}~{time.endTime}
                      </div>
                    )),
                )}
            </div>
            <Button className="button-black" onClick={closeModal}>
              확인
            </Button>
          </aside>
          {/* <CalendarTablet
          closeModal={closeModal}
          setSelectedSchedule={setSelectedSchedule}
          setSelectedDateString={setSelectedDateString}
          handleMonthChange={handleMonthChange}
          schedule={schedule}
          selectedSchedule={selectedSchedule}
          handleSelectedSchedule={handleSelectedSchedule}
        /> */}
        </Modal>
        <Modal name="customer-counter-mobile" classNameModal="no-animation">
          <aside className="customer-counter-mobile">
            <h3>참여 인원 수</h3>
            <div className="customer-counter-mobile-control">
              <img src="/assets/icons/icon-minus.svg" onClick={() => handleHowManyCustomer('-')} />
              <input value={howMany} type="number" onChange={(e) => setHowMany(Math.max(1, Number(e.target.value)))} />
              <img src="/assets/icons/icon-plus.svg" onClick={() => handleHowManyCustomer('+')} />
            </div>
            <Button
              className="button-black"
              onClick={() => {
                closeModal();
              }}
            >
              확인
            </Button>
          </aside>
        </Modal>
      </div>
      <div className="calendar-mobile">
        <h2>
          ₩ {detail?.price.toLocaleString()} /{' '}
          <span onClick={() => openModal('customer-counter-mobile')}>{howMany}명</span>
        </h2>
        <h4
          onClick={() => {
            openModal('calendar-tablet');
          }}
        >
          {selectedDateString ? selectedDateString : '날짜 선택하기'}
        </h4>
        <Button className="button-black" disabled={selectedSchedule ? false : true} onClick={handleSubmitReservation}>
          예약하기
        </Button>
      </div>
    </>
  );
}
