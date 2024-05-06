import { useState, useEffect, useCallback } from 'react';

/**
 * Window 가로 사이즈 구하는 함수
 * @returns window width
 */

function useCheckWindowWidthSize() {
  const [width, setWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [handleResize]);

  return width;
}

/**
 * @description 가로 사이즈를 통해 deviceType ('pc', 'table', 'mobile') 반환 하는 함수
 * @returns 'pc' | 'tablet' | 'mobile'
 */

export default function useDeviceType() {
  const width = useCheckWindowWidthSize();
  if (width === 0) return;

  let deviceType;
  if (width >= 1200) {
    deviceType = 'pc';
  } else if (width >= 768) {
    deviceType = 'tablet';
  } else {
    deviceType = 'mobile';
  }

  return deviceType;
}
