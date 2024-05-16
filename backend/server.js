// Dependency imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

// File and route imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server, io } from "./socket/socket.js";

const __dirname = path.resolve();

// Server setup

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cookieParser());

// Routes
app.use(express.json()); // for parsing incoming json

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html"));
});

// Server start
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});
