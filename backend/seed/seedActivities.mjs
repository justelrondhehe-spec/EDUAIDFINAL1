import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Activity from "../models/Activity.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eduaid";

async function run() {
  try {
    console.log("Connecting to MongoDB:", MONGO_URI);
    await mongoose.connect(MONGO_URI);

    const filePath = path.join(__dirname, "activitiesSeed.json");
    const json = await fs.readFile(filePath, "utf-8");
    const activities = JSON.parse(json);

    console.log("Clearing existing activities…");
    await Activity.deleteMany({});

    console.log(`Inserting ${activities.length} activities…`);
    await Activity.insertMany(activities);

    console.log("Activity seed completed ✅");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Activity seed failed ❌", err);
    process.exit(1);
  }
}

run();
