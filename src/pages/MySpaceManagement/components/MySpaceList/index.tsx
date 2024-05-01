import { getMyActivities } from '@/api/myActivitiesApi';
import { ActivityBasic } from '@/api/types/myActivities';
import useIntersectionObserver from '@/hooks/useIntersectionObserver/useIntersectionObserver';
import { useRef, useState } from 'react';
import './style.scss';
import MySpaceCard from '../MySpaceCard';

export default function MySpaceList() {
  const [mySpace, setMySpace] = useState<ActivityBasic[]>([]);
  const cursorId = useRef<number | null>(null);
  const hasNotNext = mySpace.length !== 0 && !cursorId.current;

  const handleMySpaceList = async () => {
    if (hasNotNext) {
      return;
    }
    const { activities, cursorId: newCursorId } = await getMyActivities(10, cursorId.current);
    cursorId.current = newCursorId;
    setMySpace((pre) => [...pre, ...activities]);
  };
  const { sentinelRef } = useIntersectionObserver(handleMySpaceList);
  return (
    <div>
      {mySpace.length > 0 ? (
        <div className="my-space-list-box">
          {mySpace.map((space) => (
            <MySpaceCard activity={space} key={space.id} />
          ))}
        </div>
      ) : (
        <div className="not-found-file-box">
          <img src="/assets/images/not-found-file.svg" alt="관리할 방이 없습니다" />
          <span>아직 등록한 방이 없어요</span>
        </div>
      )}
      <div ref={sentinelRef}></div>
    </div>
  );
}
