import React, { Fragment, useCallback, useEffect } from "react";

/**
 * --- NK-Flatlist ---
 * @param {Array} data - Array de dados
 * @param {Function} renderItem - Função (item) => JSX
 * @param {number} onEndReachedThreshold - Margem para trigger de scroll
 */
export default function Flatlist({ 
  data = [], 
  renderItem, 
  ItemSeparatorComponent, 
  ListFooterComponent, 
  onEndReached, 
  onEndReachedThreshold = 0.5 
}) {
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - onEndReachedThreshold) {
      if (onEndReached) onEndReached();
    }
  }, [onEndReached, onEndReachedThreshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {data.map((item, index) => (
        <Fragment key={item.id || index}>
          {renderItem(item)}
          {ItemSeparatorComponent && index < data.length - 1 && <ItemSeparatorComponent />}
        </Fragment>
      ))}
      {ListFooterComponent && <ListFooterComponent />}
    </>
  );
};

