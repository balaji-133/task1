import Button from './Button'
import React from 'react';

export default function Header({ onNew }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Learnato Discussion Forum</h1>
        <p className="text-slate-500">Empower learning through conversation.</p>
      </div>
      <Button onClick={onNew} variant="primary">+ New Post</Button>
    </header>
  )
}
