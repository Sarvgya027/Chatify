// Dependency imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// File and route imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connectToMongoDB.js";

// Server setup
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cookieParser());

// Routes
app.use(express.json()); // for parsing incoming json

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("server is running!!");
// });

// Mongoose stuff for advance


// Server start
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});
