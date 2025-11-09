import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  fetchPosts,
  createPost,
  upvote,
  reply,
  markAnswered,
  fetchPost,
  deletePost,
  updatePost,
} from "./lib/api";
import Layout from "./components/Layout";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PostList from "./components/PostList";
import NewPostModal from "./components/NewPostModal";
import EditPostModal from "./components/EditPostModal";
import PostDetail from "./components/PostDetail";
import Spinner from "./components/Spinner";

// connect socket
const socket = io(import.meta.env.VITE_API_URL || "http://localhost:4000");

export default function App() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("top");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [editPost, setEditPost] = useState(null);

  // 🔁 Load all posts
  async function load() {
    setLoading(true);
    const res = await fetchPosts({ q: query, sort });
    setPosts(res);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [query, sort]);

  // ✏️ Update post
  const handleUpdate = async (id, data) => {
    await updatePost(id, data);
    await load();
    setEditPost(null);
  };

  // ❌ Delete post
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      await load();
    }
  };

  // ⬆️ Upvote post
  const handleUpvote = async (id) => {
    await upvote(id);
    await load();
  };

  // ⚡ Real-time updates (socket)
  useEffect(() => {
    socket.on("post:created", (post) => setPosts((prev) => [post, ...prev]));
    socket.on("post:upvoted", ({ postId, votes }) =>
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, votes } : p))
      )
    );
    socket.on("post:deleted", (id) =>
      setPosts((prev) => prev.filter((p) => p.id !== id))
    );
    socket.on("post:updated", (post) =>
      setPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)))
    );
    socket.on("post:answered", ({ postId }) =>
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, answered: true } : p))
      )
    );

    return () => socket.off();
  }, []);

  return (
    <Layout>
      <Header onNew={() => setShowNew(true)} />

      <div className="card">
        <SearchBar
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
        />

        {loading ? (
          <Spinner />
        ) : (
          <PostList
            posts={posts}
            onOpen={(id) => setActiveId(id)}
            onUpvote={handleUpvote}
            onEdit={(post) => setEditPost(post)}
            onDelete={handleDelete}
          />
        )}
      </div>

      {activeId && (
        <PostDetail
          id={activeId}
          onClose={() => setActiveId(null)}
          onReply={(id, payload) => reply(id, payload).then(load)}
          onMarkAnswer={(id) => markAnswered(id).then(load)}
        />
      )}

      {showNew && (
        <NewPostModal
          onClose={() => setShowNew(false)}
          onCreate={(p) => createPost(p).then(() => setShowNew(false))}
        />
      )}

      {editPost && (
        <EditPostModal
          post={editPost}
          onClose={() => setEditPost(null)}
          onSave={handleUpdate}
        />
      )}
    </Layout>
  );
}
