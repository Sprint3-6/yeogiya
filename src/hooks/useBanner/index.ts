import { useState, useEffect, useRef } from 'react';

export const BANNER = [
  {
    id: 1,
    src: '/assets/images/banner-image-party.jpg',
    title: '특별한 순간을 위한 완벽한 공간을 찾고 계신가요?',
    description: '파티룸, 이벤트홀, 공연장까지 YEOGIYA 는 여러분의 최고의 순간을 위한 공간을 제공합니다.',
  },
  {
    id: 2,
    src: '/assets/images/banner-image-studio.jpg',
    title: '프라이빗한 창작의 공간을 찾고 계신가요?',
    description:
      'YEOGIYA 에서 스튜디오와 연습실을 찾아보세요. 창작의 공간이 여러분을 기다립니다. \n음악, 무용, 미술, 또는 기타 예술 활동을 위한 공간을 만나보세요.',
  },
  {
    id: 3,
    src: '/assets/images/banner-image-wework.jpg',
    title: '비즈니스를 위한 공간을 찾고 계신가요?',
    description:
      '비즈니스 미팅, 회의, 교육 등 다양한 목적으로 활용할 수 있는 회의실을 YEOGIYA 에서 만나보세요! \n편리한 예약 시스템과 다양한 옵션으로 비즈니스에 필요한 모든 것을 갖춘 공간을 경험해보세요.',
  },
  {
    id: 4,
    src: '/assets/images/background-emptyRoom.jpg',
    title: 'YEOGIYA 에서,\n 이 모든 테마의 공간을 만나볼 수 있습니다!',
    description: '다양한 테마의 공간을 지금 바로 등록하고 이용해보세요!',
  },
];

function useBanner() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [mouseOnSlider, setMouseOnSlider] = useState(false);

  const slideRef = useRef<HTMLDivElement>(null);
  let slideTimer: NodeJS.Timeout | undefined;

  const handleSlide = (num: number) => {
    setSlideIndex((prev) => (prev + num + BANNER.length) % BANNER.length);
  };

  const handleSlideAuto = () => {
    if (!mouseOnSlider) {
      slideTimer = setTimeout(() => {
        handleSlide(1);
      }, 4000);
    } else {
      clearTimeout(slideTimer);
    }
  };

  const handleMouseOnSlider = (bool: boolean) => {
    setMouseOnSlider(bool);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    handleSlideAuto();

    return () => clearTimeout(slideTimer);
  }, [slideIndex, mouseOnSlider]);

  return { handleMouseOnSlider, slideRef, handleSlide };
}

export default useBanner;
