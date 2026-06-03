// ScrollView.jsx
import React, { useRef, useImperativeHandle } from "react";

export const ScrollView = React.forwardRef(
  (
    {
      className = "",
      contentContainerClassName = "",
      horizontal = false,
      showsScrollIndicator = true,
      onScroll,
      onEndReached,
      onEndReachedThreshold = 0.1,
      children,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef(null);

    useImperativeHandle(ref, () => ({
      get node() {
        return innerRef.current;
      },
      scrollToTop(options) {
        innerRef.current?.scrollTo({ top: 0, left: 0, ...options });
      },
      scrollToEnd(options) {
        const el = innerRef.current;
        if (!el) return;
        el.scrollTo({
          top: el.scrollHeight,
          left: el.scrollWidth,
          ...options,
        });
      },
      scrollTo(options) {
        innerRef.current?.scrollTo(options);
      },
    }));

    const handleScroll = (e) => {
      onScroll?.(e);

      if (onEndReached) {
        const el = e.currentTarget;
        const isHorizontal = horizontal;
        const scrolled = isHorizontal ? el.scrollLeft + el.clientWidth : el.scrollTop + el.clientHeight;
        const total = isHorizontal ? el.scrollWidth : el.scrollHeight;
        const threshold = total * (1 - onEndReachedThreshold);
        if (scrolled >= threshold) {
          onEndReached();
        }
      }
    };

    const scrollDirectionClass = horizontal ? "overflow-x-auto overflow-y-hidden" : "overflow-y-auto overflow-x-hidden";
    const scrollbarClass = showsScrollIndicator ? "" : "scrollbar-hide [&::-webkit-scrollbar]:hidden";
    const contentDirectionClass = horizontal ? "flex flex-row" : "flex flex-col";

    return (
      <div
        ref={innerRef}
        className={`${scrollDirectionClass} ${scrollbarClass} ${className}`}
        onScroll={handleScroll}
        ...props
      >
        <div className={`${contentDirectionClass} ${contentContainerClassName}`}>
          {children}
        </div>
      </div>
    );
  }
);

ScrollView.displayName = "ScrollView";

export default ScrollView;
