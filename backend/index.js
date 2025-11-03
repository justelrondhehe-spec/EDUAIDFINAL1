// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000; // Choose a port different from your React app

// --- Middleware ---
// 1. Allow your frontend (running on a different port) to make requests
app.use(cors()); 
// 2. Allow the server to understand JSON data sent in requests
app.use(express.json()); 

// --- Routes ---
// A simple "test" route to make sure it's working
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend! 👋" });
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});