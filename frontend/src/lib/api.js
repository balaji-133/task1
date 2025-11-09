const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchPosts({ q = "", sort = "top" } = {}) {
  const r = await fetch(`${API}/posts?q=${encodeURIComponent(q)}&sort=${sort}`);
  return r.json();
}
export async function fetchPost(id) {
  const r = await fetch(`${API}/posts/${id}`);
  return r.json();
}
export async function createPost(payload) {
  const r = await fetch(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return r.json();
}
export async function upvote(id) {
  const r = await fetch(`${API}/posts/${id}/upvote`, { method: "POST" });
  return r.json();
}
export async function reply(id, payload) {
  const r = await fetch(`${API}/posts/${id}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return r.json();
}
export async function markAnswered(id) {
  const r = await fetch(`${API}/posts/${id}/answer`, { method: "POST" });
  return r.json();
}
export async function updatePost(id, payload) {
  const r = await fetch(`${API}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return r.json();
}
export async function deletePost(id) {
  const r = await fetch(`${API}/posts/${id}`, { method: "DELETE" });
  return r.json();
}
