import React from 'react';

export default function Reply({ reply }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>{reply.author || 'Anonymous'}</span>
        <span>{new Date(reply.createdAt).toLocaleString()}</span>
      </div>
      <p className="mt-2 text-slate-700 whitespace-pre-line">{reply.content}</p>
    </div>
  )
}
