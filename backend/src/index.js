import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";
import buildPostRouter from "./routes/posts.js";

const app = express();
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/health", (_, res) => res.json({ ok: true }));
app.use("/posts", buildPostRouter(io));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

server.listen(4000, () => console.log("✅ Backend running at http://localhost:4000"));
