import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">{children}</div>
      <footer className="text-center text-xs text-slate-500 py-6">Learnato Forum · In-memory · © {new Date().getFullYear()}</footer>
    </div>
  )
}
