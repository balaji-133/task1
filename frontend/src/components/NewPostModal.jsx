import { useState } from 'react'
import Button from './Button'
import React from 'react';


export default function NewPostModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const disabled = !title.trim() || !content.trim()

  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
      <div className="card max-w-lg w-full">
        <h3 className="text-lg font-semibold">Create Post</h3>
        <div className="mt-3 space-y-3">
          <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="input h-32" placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
          <input className="input" placeholder="Author (optional)" value={author} onChange={e=>setAuthor(e.target.value)} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={disabled} onClick={()=>onCreate({ title, content, author })}>Create</Button>
        </div>
      </div>
    </div>
  )
}
