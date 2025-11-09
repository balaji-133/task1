let postId = 1;
let replyId = 1;

export const posts = [
  {
    id: postId++,
    title: "How do I deploy Node.js on Cloud Run?",
    content: "Looking for a minimal setup with Docker.",
    author: "Rohan",
    votes: 5,
    answered: false,
    createdAt: new Date().toISOString(),
    replies: [
      { id: replyId++, content: "Use gcloud with region.", author: "Aisha", createdAt: new Date().toISOString() },
      { id: replyId++, content: "Enable Cloud Build first!", author: "Dev", createdAt: new Date().toISOString() }
    ]
  }
];

export function listPosts({ q = "", sort = "top" } = {}) {
  let result = posts.filter(p =>
    p.title.toLowerCase().includes(q.toLowerCase()) ||
    p.content.toLowerCase().includes(q.toLowerCase())
  );
  if (sort === "new") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else result.sort((a, b) => b.votes - a.votes);
  return result;
}

export function createPost({ title, content, author }) {
  const newPost = {
    id: postId++,
    title,
    content,
    author: author || "Anonymous",
    votes: 0,
    answered: false,
    createdAt: new Date().toISOString(),
    replies: []
  };
  posts.unshift(newPost);
  return newPost;
}

export function getPost(id) {
  return posts.find(p => p.id === Number(id));
}

export function addReply(postIdNum, { content, author }) {
  const post = getPost(postIdNum);
  if (!post) return null;
  const rep = { id: replyId++, content, author: author || "Anonymous", createdAt: new Date().toISOString() };
  post.replies.push(rep);
  return { post, reply: rep };
}

export function upvote(postIdNum) {
  const post = getPost(postIdNum);
  if (!post) return null;
  post.votes += 1;
  return post;
}

export function markAnswered(postIdNum) {
  const post = getPost(postIdNum);
  if (!post) return null;
  post.answered = true;
  return post;
}
