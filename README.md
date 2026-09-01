# Instagram Login Demo

A front-end-inspired mobile login interface with a Node.js/Express backend for credential handling.

## Local Development

### Prerequisites
- Node.js 18.x or higher
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000`

## Railway Deployment

This project is configured for easy deployment on Railway.

### Steps to Deploy:

1. **Connect your GitHub repository** to Railway
2. **Railway will automatically**:
   - Detect the Node.js project
   - Install dependencies from `package.json`
   - Run the application using the `start` script
   - Set the `PORT` environment variable

### Environment Variables

- `PORT` - Automatically set by Railway (default: 3000)
- `SAVE_DIR` - Optional: Directory to save credentials (default: `./data`)

### What happens on deployment:

- Your app will be built and deployed automatically
- The server will run on the PORT assigned by Railway
- Credentials will be saved to a local `data/` directory

### Useful Railway Commands:

- View logs: Check the Deployment tab in Railway dashboard
- Set variables: Use Railway dashboard or CLI
- Redeploy: Push changes to your GitHub repository

## Project Structure

- `server.js` - Express.js server with login endpoint
- `app.html` - Instagram-style login interface
- `package.json` - Node.js dependencies and configuration
- `Procfile` - Process configuration for Railway

## Security Note

⚠️ This is a demo project. In production:
- Never store plain-text passwords
- Use HTTPS
- Implement proper authentication
- Use secure password hashing
- Validate and sanitize all inputs
