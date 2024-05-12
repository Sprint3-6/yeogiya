import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(callback: () => void, options?: IntersectionObserverInit) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(callback);
  const optionsRef = useRef(options);
  callbackRef.current = callback;
  optionsRef.current = options;
  useEffect(() => {
    if (sentinelRef.current === null) return;
    const observer = new IntersectionObserver((items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          callbackRef.current();
        }
      });
    }, optionsRef.current);
    const currentRef = sentinelRef.current;
    if (currentRef) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [optionsRef.current]);

  return { sentinelRef };
}
