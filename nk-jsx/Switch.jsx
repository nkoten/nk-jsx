// Switch.jsx
import React, { useId } from 'react';

export const Switch = ({
  className = '',
  inactiveClassName = '',
  thumbClassName = '',
  value,
  onValueChange,
  disabled = false,
  label,
  labelPosition = 'right',
  labelClassName = '',
  id: externalId,
}) => {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  const activeTrack = `bg-blue-500 ${className}`;
  const inactiveTrack = `bg-gray-300 ${inactiveClassName}`;

  const toggle = () => {
    if (!disabled) onValueChange(!value);
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  };

  const switchEl = (
    <button
      role="switch"
      id={id}
      aria-checked={value}
      aria-disabled={disabled}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type="button"
      className={`
        relative inline-flex items-center flex-shrink-0
        w-12 h-6 rounded-full
        transition-colors duration-200 ease-in-out
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${value ? activeTrack : inactiveTrack}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          inline-block w-5 h-5 rounded-full bg-white shadow-md
          transition-transform duration-200 ease-in-out
          ${value ? 'translate-x-6' : 'translate-x-0.5'}
          ${thumbClassName}
        `}
      />
    </button>
  );

  if (!label) return switchEl;

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {labelPosition === 'left' && (
        <span className={`text-sm select-none ${labelClassName}`}>{label}</span>
      )}
      {switchEl}
      {labelPosition === 'right' && (
        <span className={`text-sm select-none ${labelClassName}`}>{label}</span>
      )}
    </label>
  );
};

Switch.displayName = 'Switch';

export default Switch;
