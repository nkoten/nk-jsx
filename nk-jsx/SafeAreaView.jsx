// import React from "react";

const edgeToProperty = {
  top: { padding: 'paddingTop', margin: 'marginTop' },
  bottom: { padding: 'paddingBottom', margin: 'marginBottom' },
  left: { padding: 'paddingLeft', margin: 'marginLeft' },
  right: { padding: 'paddingRight', margin: 'marginRight' },
};

const safeAreaVar = {
  top: 'env(safe-area-inset-top, 0px)',
  bottom: 'env(safe-area-inset-bottom, 0px)',
  left: 'env(safe-area-inset-left, 0px)',
  right: 'env(safe-area-inset-right, 0px)',
};

export const SafeAreaView = React.forwardRef(
  (
    {
      className = '',
      edges = ['top', 'bottom', 'left', 'right'],
      mode = 'padding',
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const insetStyle = edges.reduce((acc, edge) => {
      const prop = edgeToProperty[edge][mode];
      acc[prop] = safeAreaVar[edge];
      return acc;
    }, {});

    return (
      <div
        ref={ref}
        className={`flex flex-col ${className}`}
        style={{ ...insetStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SafeAreaView.displayName = 'SafeAreaView';

export default SafeAreaView;
