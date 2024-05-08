import HotSpaceCard from '../HotSpaceCard';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/api/constants/url';
import instance from '@/api/instance/defaultInstance';
import { Spaces } from '@/api/types/activities';
import './style.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

interface DataType {
  activities: Spaces[];
  totalCount: number;
}

export default function HotSpaceCardList() {
  const [data, setData] = useState<DataType | null>(null);

  const settings = {
    slide: 'div',
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    vertical: false,
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 960, //화면 사이즈 960px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, //화면 사이즈 768px일 때
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 3,
          slidesToScroll: 2,
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
              <HotSpaceCard key={space.id} item={space} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
