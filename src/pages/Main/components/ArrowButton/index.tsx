interface CarouselArrowProps {
  direction?: 'prev' | 'next';
  className?: string;
  color?: string;
  onClick?: () => void;
}

export default function CarouselArrow({
  direction = 'prev',
  className,
  onClick,
  color = 'var(--gray10)',
}: CarouselArrowProps) {
  const arrowPaths = {
    prev: 'M13 2L2.70711 12.2929C2.31658 12.6834 2.31658 13.3166 2.70711 13.7071L13 24',
    next: 'M2 2L12.2929 12.2929C12.6834 12.6834 12.6834 13.3166 12.2929 13.7071L2 24',
  };

  const arrowPath = arrowPaths[direction];
  const ariaLabel = direction === 'prev' ? '왼쪽 화살표' : '오른쪽 화살표';

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      <svg width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={arrowPath} stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </button>
  );
}
