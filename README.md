🧩 About the Project

Learnato Forum is a web-based discussion platform where users can share knowledge, ask questions, and interact in real time.
It mimics a full-stack forum system but uses arrays as an in-memory database, making it fast, lightweight, and ideal for demonstrations and hackathons.
Each post supports upvotes, replies, and editing features — all updating instantly via Socket.IO for a seamless, live experience.

⚙️ Features

✅ Create, edit, delete, and upvote posts
✅ Add replies under discussions
✅ Mark answers as “solved”
✅ Real-time live updates (Socket.IO)
✅ Beautiful yellow–white theme with Tailwind CSS
✅ In-memory data storage (no external DB)
✅ Modern responsive UI built with React + Vite

🧰 Tech Stack
Frontend

⚛️ React.js (Vite) — fast build system and modular UI

💅 Tailwind CSS — clean, modern styling

🔌 Socket.IO Client — real-time updates

Backend

🟢 Node.js & Express.js — RESTful API

⚡ Socket.IO Server — real-time communication

🧮 In-Memory Arrays — acts as temporary database

🧱 CORS & Helmet — for API security

🧠 Working Explanation

The backend (Express + Socket.IO) handles posts and replies using in-memory arrays.

The frontend (React + Tailwind) provides an intuitive interface where users can interact with posts.

Each CRUD operation (Create, Read, Update, Delete) triggers real-time updates across all connected clients.

The UI automatically refreshes new data via WebSockets without needing to reload the page.

🎥 Demo Video (Drive)

Due to Vercel’s credit limitations, the full live frontend deployment isn’t hosted yet.
But I’ve uploaded a complete working demo video showing the project in action.
👉 Click here : https://drive.google.com/file/d/1-j6dkCT6WGtqEEVXNjfqFraMeqsaLkfm/view?usp=sharing
