import React from 'react';
import CarouselArrow from '../CarouselArrow';
import useBanner from '@/hooks/useBanner';
import { BANNER } from '@/hooks/useBanner';
import './style.scss';

export default function Banner() {
  const { handleSlide, handleMouseOnSlider, slideRef } = useBanner();

  // YEOGIYA를 스타일링한 React 요소를 반환하는 함수
  const stylizeYeogiya = (text: string, isTitle: boolean) =>
    text
      .replace('YEOGIYA', '##YEOGIYA##')
      .split('##')
      .map((part, index: number) =>
        part === 'YEOGIYA' ? (
          <span key={index} className={isTitle ? 'yeogiya-title-text' : 'yeogiya-description-text'}>
            YEOGIYA
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      );

  return (
    <div
      className="banner-container"
      onMouseEnter={() => handleMouseOnSlider(true)}
      onMouseLeave={() => handleMouseOnSlider(false)}
    >
      <div className="banner-slide-wrapper" ref={slideRef}>
        {BANNER.map((data) => (
          <div key={data.id} className="banner-slide">
            <div className="image-wrapper">
              <img src={data.src} className="main-banner-image" alt={data.title} />
            </div>
            <div>
              <h1 className={`main-banner-title ${data.id === 4 ? 'special-title' : ''}`}>
                {stylizeYeogiya(data.title, true)}
              </h1>
              <h2 className={`main-banner-description ${data.id === 4 ? 'special-description' : ''}`}>
                {stylizeYeogiya(data.description, false)}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <CarouselArrow className="left-arrow" onClick={() => handleSlide(-1)} />
      <CarouselArrow className="right-arrow" onClick={() => handleSlide(1)} direction="next" />
    </div>
  );
}
