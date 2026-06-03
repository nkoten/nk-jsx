// TouchableOpacity.jsx
import React, { useState } from 'react';

export const TouchableOpacity = React.forwardRef(
  (
    {
      className = '',
      activeOpacity = 0.7,
      onPress,
      onPressIn,
      onPressOut,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      disabled = false,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [pressed, setPressed] = useState(false);

    const currentOpacity = pressed && !disabled ? activeOpacity : 1;

    return (
      <button
        ref={ref}
        className={`cursor-pointer transition-opacity duration-75 disabled:cursor-not-allowed ${className}`}
        style={{ opacity: currentOpacity, ...style }}
        disabled={disabled}
        onClick={onPress}
        onMouseDown={(e) => {
          setPressed(true);
          onPressIn?.(e);
          onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          setPressed(false);
          onPressOut?.(e);
          onMouseUp?.(e);
        }}
        onMouseLeave={(e) => {
          setPressed(false);
          onMouseLeave?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TouchableOpacity.displayName = 'TouchableOpacity';

export default TouchableOpacity;
