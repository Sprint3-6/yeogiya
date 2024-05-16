import { useEffect, useState } from 'react';
import './style.scss';
import { BigPictureModalType } from '../../Types/DetailTypes';

export default function BigPictureModal({ bannerImage, subImages }: BigPictureModalType) {
  const [images, setImages] = useState<string[]>([]);
  const [imagePosition, setImagePosition] = useState(0);
  const [currentImage, setCurrentImage] = useState(1);
  const [totalImages, setTotalImages] = useState<number | undefined>(1);
  const [imageOffset, setImageOffset] = useState(130);

  const handleImagesGoLeft = () => {
    if (totalImages && currentImage < totalImages) {
      setImagePosition((state) => state - imageOffset);
      setCurrentImage((state) => state + 1);
    } else {
      setImagePosition(0);
      setCurrentImage(1);
    }
  };

  const handleImagesGoRight = () => {
    if (totalImages && currentImage === 1) {
      setImagePosition(imageOffset * -totalImages + imageOffset);
      setCurrentImage(totalImages);
    } else {
      setImagePosition((state) => state + imageOffset);
      setCurrentImage((state) => state - 1);
    }
  };

  useEffect(() => {
    const subImage = subImages?.map((image) => image.imageUrl) || [];

    setImages([bannerImage as string, ...subImage]);
    setTotalImages(images.length);
  }, [totalImages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setImageOffset(80);
      } else {
        setImageOffset(130);
      }
    };

    handleResize(); // 초기 렌더링 시 호출
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="modal-image-container">
      <img src="/assets/icons/icon-left-slider.svg" className="arrow left" onClick={handleImagesGoRight} />
      {images.map((image, index) => (
        <div className="modal-image-box" style={{ transform: `translateX(${imagePosition}vh)` }} key={index}>
          <img src={image} />
        </div>
      ))}
      <img src="/assets/icons/icon-right-slider.svg" className="arrow right" onClick={handleImagesGoLeft} />
    </div>
  );
}
