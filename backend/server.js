// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import usersRoutes from './routes/usersRoutes.js';
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config();
connectDB();

import "./jobs/notificationJobs.js";

const app = express();

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
// Set FRONTEND_URL or CORS_ALLOWED_ORIGINS in .env (comma-separated) to control allowed origins.
// Default allows http://localhost:3000 for local dev.
const defaultFrontend = "http://localhost:3000";
const raw = process.env.CORS_ALLOWED_ORIGINS ?? process.env.FRONTEND_URL ?? defaultFrontend;
const allowedOrigins = raw.split(",").map(s => s.trim()).filter(Boolean);

const allowCredentials = (process.env.CORS_ALLOW_CREDENTIALS === "true");

// Use a dynamic origin checker so errors are descriptive during development
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl, mobile apps or server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: origin ${origin} is not allowed. Allowed: ${allowedOrigins.join(", ")}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: allowCredentials,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/users', usersRoutes);
app.use("/api/progress", progressRoutes);

// DEFAULT ROUTE / health check
app.get("/", (req, res) => res.send("Backend running ✅"));

// 404 handler for unmatched routes (so errorHandler receives a proper error if desired)
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// ERROR HANDLER MUST BE LAST
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));