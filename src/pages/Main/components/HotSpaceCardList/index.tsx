import HotSpaceCard from '../HotSpaceCard';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/api/constants/url';
import instance from '@/api/instance/defaultInstance';
import { Spaces } from '@/api/types/activities';
import './style.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

//TODO 1100px 부터 화살표 표시
interface DataType {
  activities: Spaces[];
  totalCount: number;
}

export default function HotSpaceCardList() {
  const [data, setData] = useState<DataType | null>(null);

  const settings = {
    arrows: true,
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

  return (
    <section className="hot-space-container">
      <div className="hot-space-header">
        <h1>🔥 HOT YEOGI</h1>
      </div>
      <div className="hot-space-card-list">
        {/* Slider 내부 요소를 바로 포함 */}
        <Slider {...settings}>
          {data?.activities.map((space) => (
            // 각 요소를 div 요소로 감싸고, 각 요소에 적절한 크기와 스타일을 지정하세요.
            <div key={space.id} className="hot-space-card-list-item">
              <HotSpaceCard item={space} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
