// Text.jsx
import React from "react";

const lineClampMap = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

export const Text = React.forwardRef(
  (
    {
      as: Tag = "span",
      className = "",
      numberOfLines,
      selectable = true,
      children,
      ...props
    },
    ref
  ) => {
    const clampClass = numberOfLines ? lineClampMap[numberOfLines] ?? "" : "";
    const selectClass = selectable ? "" : "select-none";

    return (
      <Tag
        ref={ref}
        className={`${clampClass} ${selectClass} ${className}`.trim()}
        ...props
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = "Text";

export default Text;
