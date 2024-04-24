import { getMyActivities } from '@/api/activitiesApi';
import { ActivityBasic } from '@/api/types/activities';
import useIntersectionObserver from '@/hooks/useIntersectionObserver/useIntersectionObserver';
import { useRef, useState } from 'react';
import MyActivityCard from '../MyActivityCard';
import './MyActivityList.scss';

export default function MyActivityList() {
  const [myActivities, setMyActivities] = useState<ActivityBasic[]>([]);
  const cursorId = useRef<number | null>(null);
  const hasNotNext = myActivities.length !== 0 && !cursorId.current;

  const handleMyActivityList = async () => {
    if (hasNotNext) {
      return;
    }
    const { activities, cursorId: newCursorId } = await getMyActivities(10, cursorId.current);
    cursorId.current = newCursorId;
    setMyActivities((pre) => [...pre, ...activities]);
  };
  const { sentinelRef } = useIntersectionObserver(handleMyActivityList);
  console.log();
  return (
    <div>
      {myActivities.length > 0 ? (
        <div className="my-activity-list-box">
          {myActivities.map((activity) => (
            <MyActivityCard activity={activity} key={activity.id} />
          ))}
        </div>
      ) : (
        <div>없음</div>
      )}
      <div ref={sentinelRef}></div>
    </div>
  );
}
