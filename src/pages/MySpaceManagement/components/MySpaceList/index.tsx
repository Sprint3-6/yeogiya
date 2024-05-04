import useIntersectionObserver from '@/hooks/useIntersectionObserver/useIntersectionObserver';
import './style.scss';
import MySpaceCard from '../MySpaceCard';
import { useMyActivities } from '@/hooks/useMyActivities';

export default function MySpaceList() {
  const { mySpace, isLoading, loadMore } = useMyActivities();
  const { sentinelRef } = useIntersectionObserver(loadMore);
  return (
    <div>
      {mySpace.length > 0 || isLoading ? (
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
      {isLoading && <div></div>}
      <div ref={sentinelRef}></div>
    </div>
  );
}
