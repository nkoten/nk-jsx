// KeyboardAvoidingView.jsx
import React, { useEffect, useState } from 'react';

export const KeyboardAvoidingView = React.forwardRef(
  (
    {
      className = '',
      behavior = 'padding',
      keyboardVerticalOffset = 0,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const isSupported =
      typeof window !== 'undefined' && 'visualViewport' in window;

    useEffect(() => {
      if (!isSupported) return;

      const vv = window.visualViewport;

      const handleResize = () => {
        const windowHeight = window.innerHeight;
        const viewportHeight = vv.height;
        const diff = windowHeight - viewportHeight - (vv.offsetTop || 0);
        setKeyboardHeight(Math.max(0, diff - keyboardVerticalOffset));
      };

      vv.addEventListener('resize', handleResize);
      vv.addEventListener('scroll', handleResize);

      return () => {
        vv.removeEventListener('resize', handleResize);
        vv.removeEventListener('scroll', handleResize);
      };
    }, [isSupported, keyboardVerticalOffset]);

    const adjustedStyle = (() => {
      if (behavior === 'none' || keyboardHeight === 0) return {};
      if (behavior === 'padding') return { paddingBottom: keyboardHeight };
      if (behavior === 'height')
        return { maxHeight: `calc(100% - ${keyboardHeight}px)` };
      return {};
    })();

    return (
      <div
        ref={ref}
        className={`flex flex-col transition-[padding,max-height] duration-200 ${className}`}
        style={{ ...adjustedStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

KeyboardAvoidingView.displayName = 'KeyboardAvoidingView';

export default KeyboardAvoidingView;
