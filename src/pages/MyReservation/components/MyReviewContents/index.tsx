import React, { useState } from 'react';
import './style.scss';
import Button from '@/components/Button';

type MyReviewContentsProps = {
  maxRating?: number; // 최대 별점 개수 (예: 5)
  onReviewSubmit?: (rating: number, content: string) => void; // 사용자가 별점과 후기를 제출할 때 호출할 콜백
};

export default function MyReviewContents({ maxRating = 5, onReviewSubmit }: MyReviewContentsProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // 별점 색상을 결정하는 함수
  const getStarColor = (starIndex: number): string => {
    if (hoverRating >= starIndex) {
      return '#FFEA94'; // 호버된 별의 색상
    } else if (selectedRating >= starIndex) {
      return '#FFCB02'; // 선택된 별의 색상
    } else {
      return 'var(--gray20)'; // 기본 색상
    }
  };

  // 사용자가 별을 클릭했을 때 호출되는 함수
  const handleStarClick = (starIndex: number) => {
    if (selectedRating === starIndex) {
      // 현재 선택된 별의 인덱스와 클릭된 별의 인덱스가 일치하면 선택을 취소
      setSelectedRating(0);
    } else {
      // 선택된 별의 인덱스를 업데이트
      setSelectedRating(starIndex);
    }
  };

  // 사용자가 별을 호버했을 때 호출되는 함수
  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  // 사용자가 별을 호버하지 않을 때 호출되는 함수
  const handleStarHoverLeave = () => {
    setHoverRating(0);
  };

  // 사용자가 텍스트 에리어의 내용을 변경했을 때 호출되는 함수
  const handleReviewTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };

  // 사용자가 작성하기 버튼을 클릭했을 때 호출되는 함수
  const handleReviewSubmit = () => {
    if (onReviewSubmit) {
      onReviewSubmit(selectedRating, reviewText); // 별점과 후기를 전달
    }
  };

  return (
    <>
      <div className="review-modal-ratings-wrapper">
        {Array.from({ length: maxRating }, (_, index) => {
          const starIndex = index + 1;
          const starColor = getStarColor(starIndex);
          return (
            <svg
              key={starIndex}
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleStarClick(starIndex)}
              onMouseEnter={() => handleStarHover(starIndex)}
              onMouseLeave={handleStarHoverLeave}
            >
              <g id="Icon_star_on">
                <path
                  id="Vector"
                  d="M43.0931 52.4997C42.7247 52.5011 42.3653 52.3863 42.066 52.1716L27.9993 41.9735L13.9326 52.1716C13.6321 52.3895 13.27 52.5063 12.8988 52.505C12.5275 52.5036 12.1663 52.3842 11.8674 52.1641C11.5684 51.9439 11.3473 51.6344 11.2358 51.2803C11.1244 50.9261 11.1284 50.5457 11.2474 50.1941L16.7337 33.9442L2.51493 24.1935C2.20694 23.9825 1.97449 23.6786 1.85154 23.3261C1.72859 22.9736 1.72158 22.591 1.83154 22.2343C1.9415 21.8775 2.16266 21.5653 2.46272 21.3431C2.76277 21.121 3.12599 21.0007 3.49931 20.9997H21.0409L26.3346 4.70831C26.4487 4.35658 26.6712 4.05002 26.9702 3.83259C27.2693 3.61516 27.6296 3.49805 27.9993 3.49805C28.3691 3.49805 28.7293 3.61516 29.0284 3.83259C29.3274 4.05002 29.55 4.35658 29.664 4.70831L34.9578 21.0052H52.4993C52.8731 21.005 53.2371 21.1245 53.5381 21.3462C53.839 21.5679 54.0611 21.8801 54.1717 22.2371C54.2824 22.5941 54.2758 22.9772 54.153 23.3302C54.0302 23.6833 53.7975 23.9877 53.4892 24.1989L39.2649 33.9442L44.7479 50.1897C44.8367 50.4527 44.8617 50.7331 44.8208 51.0077C44.7799 51.2823 44.6742 51.5432 44.5126 51.7688C44.3509 51.9945 44.1378 52.1785 43.891 52.3056C43.6442 52.4327 43.3707 52.4992 43.0931 52.4997Z"
                  fill={starColor}
                />
              </g>
            </svg>
          );
        })}
      </div>
      <textarea placeholder="후기를 작성해주세요" value={reviewText} onChange={handleReviewTextChange}></textarea>
      <Button className="button-black review-modal-button" onClick={handleReviewSubmit}>
        작성하기
      </Button>
    </>
  );
}
