const path = require('path');
const express = require('express'); // npm i express
const env = require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

// ========================= MONGOOSE =================================

// ========================= MONGOOSE =================================

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, 'client/build')));


//========================================= Request Handling

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

// ================================ Listening

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});