import React from "react";
import Button from "./Button";
import Badge from "./Badge";

export default function PostCard({ post, onOpen, onUpvote, onEdit, onDelete }) {
  return (
    <article className="card transition transform hover:-translate-y-1">
      <header className="flex items-start justify-between gap-3">
        <h2
          className="font-semibold text-lg cursor-pointer text-black hover:underline"
          onClick={() => onOpen(post.id)}
        >
          {post.title}
        </h2>
        {post.answered && <Badge>Answered</Badge>}
      </header>

      <p className="text-slate-700 line-clamp-3 mt-2">{post.content}</p>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>
          By <b>{post.author}</b> ·{" "}
          {new Date(post.createdAt).toLocaleString()}
        </span>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => onEdit(post)}>
            Edit
          </Button>
          <Button variant="ghost" onClick={() => onDelete(post.id)}>
            Delete
          </Button>
          <Button variant="primary" onClick={() => onUpvote(post.id)}>
            ▲ {post.votes}
          </Button>
        </div>
      </div>
    </article>
  );
}
