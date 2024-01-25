const HLSServer = require('hls-server');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// HLS server configuration
const server = new HLSServer(app, {
    path: '/stream', // The endpoint for serving HLS streams
    dir: 'public/videos', // Directory where your video files are stored
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/stream/:file', (req, res) => {
    const file = req.params.file;
    console.log(`Request for variant: ${file}`);

    const filePath = path.resolve(__dirname, 'public/videos', file);
    res.sendFile(filePath);
});


