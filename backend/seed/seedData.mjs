// backend/seed/seedData.mjs
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';

// adjust these imports to match your model filenames/exports
import Lesson from '../models/Lesson.js';
import Activity from '../models/Activity.js';

// helper to connect (if you already have connectDB, you can import it instead)
const MONGODB_URI = process.env.MONGO_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/eduaid';

async function run() {
  try {
    console.log('Connecting to MongoDB...', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected.');

    // Option 1: Read JSON files that you placed in seed/
    const lessonsPath = path.resolve('./seed/lessonsSeed.json');
    const activitiesPath = path.resolve('./seed/activitiesSeed.json');

    let lessons = [];
    let activities = [];

    try {
      const ltxt = await fs.readFile(lessonsPath, 'utf8');
      lessons = JSON.parse(ltxt);
      console.log(`Loaded ${lessons.length} lessons from ${lessonsPath}`);
    } catch (err) {
      console.warn('No lessonsSeed.json found or parse error — you can inline data or create the file.', err.message);
    }

    try {
      const atxt = await fs.readFile(activitiesPath, 'utf8');
      activities = JSON.parse(atxt);
      console.log(`Loaded ${activities.length} activities from ${activitiesPath}`);
    } catch (err) {
      console.warn('No activitiesSeed.json found or parse error — you can inline data or create the file.', err.message);
    }

    // Option 2: If you didn't add JSON files, you can define arrays inline here:
    // if (lessons.length === 0) {
    //   lessons = [
    //     { title: 'Shapes & Colors Challenge', description: '...', published: true, category: 'Foundations', difficulty: 'Beginner', duration: '10m', rating: 4.8 },
    //     ...
    //   ];
    // }
    // if (activities.length === 0) {
    //   activities = [
    //     { title: 'Shape Color Sort', description: '...', relatedLessonId: 1, published: true, totalQuestions: 8, points: 10 },
    //     ...
    //   ];
    // }

    // Optional: wipe existing lessons/activities (uncomment to clear collections)
    await Lesson.deleteMany({});
    await Activity.deleteMany({});
    console.log("Cleared activities collection");

    // Insert lessons — skip duplicates by unique title (safe-guard)
    let insertedLessons = 0;
    for (const L of lessons) {
      const exists = await Lesson.findOne({ title: L.title }).lean().exec();
      if (exists) continue;
      await Lesson.create(L);
      insertedLessons++;
    }
    console.log(`Inserted ${insertedLessons} new lessons (skipped existing)`);

    // Insert activities similarly
    let insertedActivities = 0;
    for (const A of activities) {
      const exists = await Activity.findOne({ title: A.title }).lean().exec();
      if (exists) continue;
      await Activity.create(A);
      insertedActivities++;
    }
    console.log(`Inserted ${insertedActivities} new activities (skipped existing)`);

    console.log('Seeding finished. Disconnecting...');
    await mongoose.disconnect();
    console.log('Disconnected. Done.');
    process.exit(0);
  } catch (err) {
    console.error('Seed script failed', err);
    try { await mongoose.disconnect(); } catch {}
    process.exit(1);
  }
}

run();
