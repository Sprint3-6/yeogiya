import HotSpaceCard from '../HotSpaceCard';
import { useEffect, useState, useRef } from 'react'; // useRef 추가
import { BASE_URL } from '@/api/constants/url';
import instance from '@/api/instance/defaultInstance';
import { Spaces } from '@/api/types/activities';
import './style.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import CarouselArrow from '../CarouselArrow';

//TODO 1100px 부터 화살표 표시
interface DataType {
  activities: Spaces[];
  totalCount: number;
}

export default function HotSpaceCardList() {
  const [data, setData] = useState<DataType | null>(null);
  const [showArrows, setShowArrows] = useState<boolean>(false); // 화살표 표시 여부 상태 추가
  const sliderRef = useRef<Slider>(null); // 슬라이더에 대한 ref 추가

  useEffect(() => {
    const getHotSpaces = async () => {
      try {
        const url = `${BASE_URL}activities?method=cursor&sort=most_reviewed&size=10`;
        const res = await instance.get(url);
        setData(res.data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    getHotSpaces();
  }, []);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
    focusOnSelect: true,
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    centerMode: false,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext(); // 다음 슬라이드로 이동
    }
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); // 이전 슬라이드로 이동
    }
  };

  useEffect(() => {
    // 초기 렌더링 시 창 크기에 따라 화살표 표시 여부 설정
    const handleResize = () => {
      setShowArrows(window.innerWidth >= 1100);
    };

    handleResize(); // 초기 렌더링 시 한 번 실행하여 초기 상태 설정

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="hot-space-container">
      <div className="hot-space-header">
        <h1>🔥 HOT YEOGI</h1>
      </div>
      <div className="hot-space-card-list">
        {showArrows && (
          <>
            <CarouselArrow
              direction="prev"
              color="var(--gray60)"
              className="hot-space-card-list-arrow prev"
              onClick={goToPrevSlide}
            />
            <CarouselArrow
              direction="next"
              color="var(--gray60)"
              className="hot-space-card-list-arrow next"
              onClick={goToNextSlide}
            />
          </>
        )}
        <Slider {...settings} ref={sliderRef}>
          {data?.activities.map((space) => (
            <div key={space.id} className="hot-space-card-list-item">
              <HotSpaceCard item={space} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
