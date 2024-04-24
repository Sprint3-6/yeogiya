import './arrowButton.scss';

interface ArrowButtonProp {
  fillColor?: 'enabled' | 'disabled';
  direction?: 'left' | 'right';
}

export default function ArrowButton({ fillColor = 'enabled', direction = 'left' }: ArrowButtonProp) {
  const colors = {
    enabled: '#1B1B1B',
    disabled: '#A1A1A1',
  };

  const arrows = {
    left: 'M7.14425 10.1759L12.9459 4.54991C13.3079 4.19886 14 4.41165 14 4.87402L14 16.126C14 16.5883 13.3079 16.8011 12.9459 16.4501L7.14425 10.8241C6.95192 10.6376 6.95192 10.3624 7.14425 10.1759Z',
    right:
      'M13.8558 10.1759L8.05409 4.54991C7.69207 4.19886 7 4.41165 7 4.87402L7 16.126C7 16.5883 7.69207 16.8011 8.05409 16.4501L13.8558 10.8241C14.0481 10.6376 14.0481 10.3624 13.8558 10.1759Z',
  };

  const currentColor = colors[fillColor];
  const currentDirection = arrows[direction];

  const buttonClassName = `pagination-arrow-button ${fillColor}`;

  return (
    <button className={buttonClassName}>
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path d={currentDirection} fill={currentColor} />
      </svg>
    </button>
  );
}
