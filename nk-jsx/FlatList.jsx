// FlatList.jsx
import React, { useRef, useCallback } from 'react';

export function FlatList({
  className = '',
  contentContainerClassName = '',
  data = [],
  renderItem,
  keyExtractor,
  ItemSeparatorComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  horizontal = false,
  numColumns = 1,
  onEndReached,
  onEndReachedThreshold = 0.1,
  onScroll,
}) {
  const containerRef = useRef(null);

  const getKey = useCallback(
    (item, index) => (keyExtractor ? keyExtractor(item, index) : String(index)),
    [keyExtractor],
  );

  const handleScroll = useCallback(
    (e) => {
      onScroll?.(e);
      if (onEndReached) {
        const el = e.currentTarget;
        const scrolled = horizontal
          ? el.scrollLeft + el.clientWidth
          : el.scrollTop + el.clientHeight;
        const total = horizontal ? el.scrollWidth : el.scrollHeight;
        if (scrolled >= total * (1 - onEndReachedThreshold)) {
          onEndReached();
        }
      }
    },
    [onScroll, onEndReached, onEndReachedThreshold, horizontal],
  );

  const renderHeader = () => {
    if (!ListHeaderComponent) return null;
    return React.isValidElement(ListHeaderComponent)
      ? ListHeaderComponent
      : React.createElement(ListHeaderComponent);
  };

  const renderFooter = () => {
    if (!ListFooterComponent) return null;
    return React.isValidElement(ListFooterComponent)
      ? ListFooterComponent
      : React.createElement(ListFooterComponent);
  };

  const renderEmpty = () => {
    if (!ListEmptyComponent || data.length > 0) return null;
    return React.isValidElement(ListEmptyComponent)
      ? ListEmptyComponent
      : React.createElement(ListEmptyComponent);
  };

  const useGrid = !horizontal && numColumns > 1;

  const contentClass = horizontal
    ? `flex flex-row ${contentContainerClassName}`
    : useGrid
      ? `grid grid-cols-${numColumns} ${contentContainerClassName}`
      : `flex flex-col ${contentContainerClassName}`;

  return (
    <div
      ref={containerRef}
      className={`${horizontal ? 'overflow-x-auto' : 'overflow-y-auto'} ${className}`}
      onScroll={handleScroll}
    >
      {renderHeader()}
      <div className={contentClass}>
        {data.length === 0
          ? renderEmpty()
          : data.map((item, index) => (
              <React.Fragment key={getKey(item, index)}>
                {index > 0 && ItemSeparatorComponent && (
                  <ItemSeparatorComponent />
                )}
                {renderItem({ item, index })}
              </React.Fragment>
            ))}
      </div>
      {renderFooter()}
    </div>
  );
}

FlatList.displayName = 'FlatList';

export default FlatList;
