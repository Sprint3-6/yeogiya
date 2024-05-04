import { useRef, useState } from 'react';
import { getMyActivities } from '@/api/myActivitiesApi';
import { ActivityBasic } from '@/api/types/myActivities';

export const useMyActivities = () => {
  const [mySpace, setMySpace] = useState<ActivityBasic[]>([]);
  const cursorId = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasNotNext = mySpace.length !== 0 && !cursorId.current;

  const loadMore = async () => {
    if (hasNotNext || isLoading) return;

    setIsLoading(true);
    try {
      const { activities, cursorId: newCursorId } = await getMyActivities(10, cursorId.current);
      cursorId.current = newCursorId;
      setMySpace((prevSpace) => [...prevSpace, ...activities]);
    } catch (error) {
      console.error('Failed to load activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   loadMore(); // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
  // }, []);

  return {
    mySpace,
    isLoading,
    hasNotNext,
    loadMore,
  };
};
