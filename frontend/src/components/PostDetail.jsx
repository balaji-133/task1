import { useEffect, useState } from 'react'
import { fetchPost } from '../lib/api'
import Button from './Button'
import Reply from './Reply'
import Badge from './Badge'
import React from 'react';


export default function PostDetail({ id, onClose, onReply, onMarkAnswer }) {
  const [post, setPost] = useState(null)
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => { fetchPost(id).then(setPost) }, [id])
  if (!post) return null

  return (
    <div className="fixed inset-0 bg-black/30 p-4 overflow-y-auto">
      <div className="card max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-slate-500 text-sm">By {post.author} · {new Date(post.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            {post.answered && <Badge>Answered</Badge>}
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </div>
        </div>
        <p className="mt-3 text-slate-700 whitespace-pre-line">{post.content}</p>

        <div className="mt-6">
          <h3 className="font-semibold">Replies ({post.replies.length})</h3>
          <div className="mt-3 space-y-3">
            {post.replies.map(r => <Reply key={r.id} reply={r} />)}
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Write a reply..." className="input h-28" />
          <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Your name (optional)" className="input" />
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={()=>onMarkAnswer(post.id)}>Mark as Answered</Button>
            <Button variant="primary" onClick={()=> onReply(post.id, { content, author }).then(()=>{ setContent(''); setAuthor(''); fetchPost(id).then(setPost); })}>Add Reply</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
