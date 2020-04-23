import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist/')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 5555;
app.listen(port);

console.log(`Listening on ${port}`);
