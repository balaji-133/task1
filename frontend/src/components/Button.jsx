import React from 'react';

export default function Button({ children, variant = 'primary', disabled, ...rest }) {
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-ghost'
  return (
    <button className={`${cls} ${disabled? 'opacity-60 cursor-not-allowed':''}`} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
