// Modal.jsx
import React, { useEffect, useCallback } from 'react';

export const Modal = ({
  className = '',
  contentClassName = '',
  visible,
  animationType = 'fade',
  presentationStyle = 'pageSheet',
  dismissible = true,
  onRequestClose,
  onShow,
  onDismiss,
  children,
}) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      onShow?.();
    } else {
      document.body.style.overflow = '';
      onDismiss?.();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible, onShow, onDismiss]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onRequestClose();
    },
    [onRequestClose],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  const overlayStyles = {
    pageSheet: 'bg-black/50 items-center justify-center p-4',
    fullScreen: 'bg-white',
    overFullScreen: 'bg-transparent items-center justify-center',
  };

  const animationStyles = {
    none: '',
    fade: 'animate-[fadeIn_0.2s_ease-out]',
    slide: 'animate-[slideUp_0.3s_ease-out]',
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-50 flex ${overlayStyles[presentationStyle]} ${animationStyles[animationType]} ${className}`}
        onClick={
          dismissible
            ? (e) => {
                if (e.target === e.currentTarget) onRequestClose();
              }
            : undefined
        }
      >
        <div
          className={`relative ${presentationStyle === 'fullScreen' ? 'w-full h-full' : ''} ${contentClassName}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

Modal.displayName = 'Modal';

export default Modal;
