import { Router } from "express";
import { posts, listPosts, createPost, getPost, addReply, upvote, markAnswered } from "../data/store.js";
import { requireFields } from "../utils/validate.js";

export default function buildPostRouter(io) {
  const router = Router();

  router.get("/", (req, res) => {
    const { q = "", sort = "top" } = req.query;
    res.json(listPosts({ q, sort }));
  });

  router.get("/:id", (req, res) => {
    const post = getPost(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  router.post("/", (req, res, next) => {
    try {
      requireFields(req.body, ["title", "content"]);
      const post = createPost(req.body);
      io.emit("post:created", post);
      res.status(201).json(post);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id/reply", (req, res, next) => {
    try {
      requireFields(req.body, ["content"]);
      const result = addReply(req.params.id, req.body);
      if (!result) return res.status(404).json({ message: "Post not found" });
      io.emit("post:replied", { postId: Number(req.params.id), reply: result.reply });
      res.status(201).json(result.post);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id/upvote", (req, res) => {
    const post = upvote(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    io.emit("post:upvoted", { postId: Number(req.params.id), votes: post.votes });
    res.json(post);
  });

  router.post("/:id/answer", (req, res) => {
    const post = markAnswered(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    io.emit("post:answered", { postId: Number(req.params.id) });
    res.json(post);
  });

  // ✅ New Update (PUT) and Delete (DELETE)
  router.put("/:id", (req, res) => {
    const post = getPost(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    io.emit("post:updated", post);
    res.json(post);
  });

  router.delete("/:id", (req, res) => {
    const idx = posts.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ message: "Post not found" });
    const deleted = posts.splice(idx, 1)[0];
    io.emit("post:deleted", deleted.id);
    res.json({ success: true });
  });

  return router;
}
