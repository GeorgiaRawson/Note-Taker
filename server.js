// Import the required modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const PORT = 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// TODO:  Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
// Define the path to the JSON file
const noteFilePath = path.join(__dirname, "data.json");

// Function to read data from the JSON file
const noteData = () => {
  if (!fs.existsSync(noteFilePath)) {
    return [];
  }
  const note = fs.readFileSync(noteFilePath);
  return JSON.parse(note);
};

// Function to write data to the JSON file
const writeNote = (note) => {
  fs.writeFileSync(noteFilePath, JSON.stringify(note, null, 2));
};

// TODO: Handle GET request at the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.htm"));
});
// Handle GET request to retrieve stored data
app.get("/data", (req, res) => {
  const note = readNote();
  res.json(note);
});

// Handle POST request to save new data with a unique ID
app.post("/data", (req, res) => {
  const newNote = { id: uuidv4(), ...req.body };
  const currentNote = readNote();
  current.note(newNote);
  writeNote(currentNote);
  res.json({ message: "Note saved successfully", note: newNote });
});

// Handle POST request at the /echo route
app.post("/echo", (req, res) => {
  // Respond with the same data that was received in the request body
  res.json({ received: req.body });
});

// Wildcard route to handle undefined routes
app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});