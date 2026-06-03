// Image.jsx
import React, { useState } from "react";

const resizeModeMap = {
  cover: "object-cover",
  contain: "object-contain",
  stretch: "object-fill",
  center: "object-none",
  repeat: "object-none bg-repeat",
};

export const Image = React.forwardRef(
  (
    {
      className = "",
      source,
      resizeMode = "cover",
      loadingPlaceholder,
      fallback,
      alt = "",
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = useState("loading");

    const uri = typeof source === "string" ? source : source?.uri;
    const objectFitClass = resizeModeMap[resizeMode] ?? "object-cover";

    const handleLoad = (e) => {
      setStatus("loaded");
      onLoad?.(e);
    };

    const handleError = (e) => {
      setStatus("error");
      onError?.(e);
    };

    if (status === "error" && fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className={`relative inline-flex ${className}`}>
        {status === "loading" && loadingPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center">
            {loadingPlaceholder}
          </div>
        )}
        <img
          ref={ref}
          src={uri}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${objectFitClass} ${status === "loading" ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
          ...props
        />
      </div>
    );
  }
);

Image.displayName = "Image";

export default Image;
