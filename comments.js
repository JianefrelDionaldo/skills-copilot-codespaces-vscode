// Create web server for the comments API

// Import the express module
const express = require('express');

// Import the body-parser module
const bodyParser = require('body-parser');

// Import the fs module
const fs = require('fs');

// Create an instance of the express module
const app = express();

// Use the body-parser module to parse the request body
app.use(bodyParser.json());

// Define the port
const port = 3000;

// Define the path to the JSON file
const commentsPath = './comments.json';

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }

    const comments = JSON.parse(data);
    res.send(comments);
  });
});

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;

  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(comment);

    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing comments file');
        return;
      }

      res.send(comment);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});