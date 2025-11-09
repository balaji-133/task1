import React from "react";
import PostCard from "./PostCard";

export default function PostList({ posts, onOpen, onUpvote, onEdit, onDelete }) {
  if (!posts.length)
    return (
      <p className="text-center text-slate-500">
        No posts yet. Be the first!
      </p>
    );

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {posts.map((p) => (
        <PostCard
          key={p.id}
          post={p}
          onOpen={onOpen}
          onUpvote={onUpvote}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
