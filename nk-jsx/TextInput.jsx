// TextInput.jsx
import React, { useState, useCallback } from 'react';

const keyboardTypeToInputType = {
  default: 'text',
  numeric: 'number',
  'email-address': 'email',
  'phone-pad': 'tel',
  'decimal-pad': 'number',
  url: 'url',
  'web-search': 'search',
};

export const TextInput = React.forwardRef(
  (
    {
      className = '',
      keyboardType = 'default',
      secureTextEntry = false,
      multiline = false,
      numberOfLines = 4,
      editable = true,
      autoComplete,
      onChangeText,
      onSubmitEditing,
      onEndEditing,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const handleChange = useCallback(
      (e) => {
        onChangeText?.(e.target.value);
      },
      [onChangeText],
    );

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === 'Enter' && !multiline) {
          onSubmitEditing?.(e);
        }
      },
      [onSubmitEditing, multiline],
    );

    const baseClass = `w-full outline-none bg-transparent ${!editable ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

    if (multiline) {
      return (
        <textarea
          ref={ref}
          rows={numberOfLines}
          disabled={!editable}
          autoComplete={autoComplete}
          className={`resize-none ${baseClass}`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={(e) => {
            onBlur?.(e);
            onEndEditing?.(e);
          }}
          {...props}
        />
      );
    }

    const inputType = secureTextEntry
      ? 'password'
      : keyboardTypeToInputType[keyboardType];

    return (
      <input
        ref={ref}
        type={inputType}
        disabled={!editable}
        autoComplete={autoComplete}
        className={baseClass}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={(e) => {
          onBlur?.(e);
          onEndEditing?.(e);
        }}
        {...props}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
