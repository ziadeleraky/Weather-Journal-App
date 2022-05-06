// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Require body-parser to parse data from server side
const bodyParser = require("body-parser");

// Cors for cross origin allowance
const cors = require("cors");

// Start up an instance of app
const app = express();

// Using cross origin allowance
app.use(cors());

// Port Channel
const port = 8000;

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => console.log("Server is now running on port " + port));

// Setting up route for sending data with their new objects to the client side
app.get("/getData", (req, res) => {
  res.send(projectData);
});

// Setting up route for recieving and saving data into our projectData object from client side
app.post("/postData", (req, res) => {
  projectData = { ...req.body };
  res.send();
});
