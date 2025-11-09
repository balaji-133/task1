import React, { useState } from "react";
import Button from "./Button";

export default function EditPostModal({ post, onClose, onSave }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const disabled = !title.trim() || !content.trim();

  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
      <div className="card max-w-lg w-full">
        <h3 className="text-lg font-semibold">Edit Post</h3>
        <div className="mt-3 space-y-3">
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="input h-32" value={content} onChange={e=>setContent(e.target.value)} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={disabled} onClick={()=>onSave(post.id, { title, content })}>Save</Button>
        </div>
      </div>
    </div>
  );
}
