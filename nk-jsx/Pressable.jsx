// Pressable.jsx
import React, { useState, useCallback } from 'react';

export const Pressable = React.forwardRef(
  (
    {
      className,
      children,
      onPress,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [pressed, setPressed] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    const state = { pressed, hovered, focused };

    const resolvedClassName =
      typeof className === 'function' ? className(state) : (className ?? '');

    const resolvedChildren =
      typeof children === 'function' ? children(state) : children;

    const handleMouseDown = useCallback(
      (e) => {
        setPressed(true);
        onPressIn?.(e);
        onMouseDown?.(e);
      },
      [onPressIn, onMouseDown],
    );

    const handleMouseUp = useCallback(
      (e) => {
        setPressed(false);
        onPressOut?.(e);
        onMouseUp?.(e);
      },
      [onPressOut, onMouseUp],
    );

    const handleClick = useCallback(
      (e) => {
        onPress?.(e);
        onClick?.(e);
      },
      [onPress, onClick],
    );

    const handleMouseEnter = useCallback(
      (e) => {
        setHovered(true);
        onHoverIn?.(e);
        onMouseEnter?.(e);
      },
      [onHoverIn, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e) => {
        setHovered(false);
        setPressed(false);
        onHoverOut?.(e);
        onMouseLeave?.(e);
      },
      [onHoverOut, onMouseLeave],
    );

    const handleFocus = useCallback(
      (e) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <button
        ref={ref}
        className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${resolvedClassName}`}
        disabled={disabled}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {resolvedChildren}
      </button>
    );
  },
);

Pressable.displayName = 'Pressable';

export default Pressable;
