// View.jsx
import React from "react";

export const View = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-col ${className}`}
      ...props
    >
      {children}
    </div>
  );
});

View.displayName = "View";

export default View;
