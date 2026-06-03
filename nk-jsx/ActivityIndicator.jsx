// ActivityIndicator.jsx
import React from 'react';

const sizeMap = {
  small: 20,
  large: 36,
};

export const ActivityIndicator = ({
  className = '',
  size = 'small',
  animating = true,
  accessibilityLabel = 'Carregando',
}) => {
  const px = typeof size === 'number' ? size : (sizeMap[size] ?? 20);

  return (
    <svg
      role="progressbar"
      aria-label={accessibilityLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      className={`${animating ? 'animate-spin' : 'opacity-0'} text-current ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

ActivityIndicator.displayName = 'ActivityIndicator';

export default ActivityIndicator;
