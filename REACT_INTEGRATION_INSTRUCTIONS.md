# React App → Hugo Integration: Complete Instructions

## What Has Been Done (Hugo Side)

I've set up your Hugo website to receive and mount your React Rubik's Cube Listener app:

### ✅ Created Hugo Shortcode
**File:** `layouts/shortcodes/rubiks-listener.html`

This shortcode:
- Creates a mounting div with ID `rubiks-listener-root`
- Loads your bundled CSS: `/js/rubiks-listener.css`
- Loads your bundled JS: `/js/rubiks-listener.js`
- Passes the backend API URL via `window.RUBIKS_API_URL`

**Usage in Hugo pages:**
```markdown
{{< rubiks-listener apiUrl="https://your-backend.onrender.com" >}}
```

### ✅ Ready to Receive Files
Your Hugo site expects these files in `static/js/`:
- `rubiks-listener.js` (bundled React app)
- `rubiks-listener.css` (bundled styles)

---

## What You Need to Do (React/Vite Side)

### STEP 1: Update `vite.config.js`

**Location:** `twitter-frontend/vite.config.js`

**Replace the entire file with:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Produce rubiks-listener.js instead of index-[hash].js
        entryFileNames: 'rubiks-listener.js',
        chunkFileNames: 'rubiks-listener-[name].js',
        assetFileNames: (assetInfo) => {
          // Rename index.css to rubiks-listener.css
          if (assetInfo.name === 'index.css') {
            return 'rubiks-listener.css';
          }
          return 'assets/[name].[ext]';
        }
      }
    }
  }
})
```

**Why:** This removes hash filenames so Hugo can reference predictable paths.

---

### STEP 2: Update `main.jsx`

**Location:** `twitter-frontend/src/main.jsx`

**Replace with:**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Mount to the div Hugo provides
const rootElement = document.getElementById('rubiks-listener-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Hugo mount point #rubiks-listener-root not found!');
}
```

**Why:** Hugo provides `<div id="rubiks-listener-root">` via the shortcode, so React needs to mount there instead of `#root`.

---

### STEP 3: Update `App.jsx`

**Location:** `twitter-frontend/src/App.jsx`

**Replace the API_URL line with:**

```jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// Get API URL from Hugo-injected global variable
const API_URL = window.RUBIKS_API_URL || 'http://localhost:3001';
const socket = io(API_URL);

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    socket.on('tweet', (tweet) => {
      const newTweet = { ...tweet.data, user: tweet.includes.users[0] };
      setTweets(currentTweets => [newTweet, ...currentTweets]);
    });
    
    return () => { 
      socket.disconnect(); 
    };
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Rubik's Cube Stream</h1>
      <div className="tweet-list">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <div className="tweet-author">
        <strong>{tweet.user.name}</strong> @{tweet.user.username}
      </div>
      <div className="tweet-text">{tweet.text}</div>
    </div>
  );
}

export default App;
```

**Why:** Instead of `import.meta.env.VITE_API_URL`, use `window.RUBIKS_API_URL` which Hugo injects.

---

### STEP 4: Build Your React App

In your `twitter-frontend` directory:

```bash
npm install
npm run build
```

This produces:
- `dist/rubiks-listener.js` (your entire React app + socket.io-client)
- `dist/rubiks-listener.css` (all styles)

---

### STEP 5: Copy Built Files to Hugo

```bash
# From your twitter-frontend directory
cp dist/rubiks-listener.js /Users/taydenwhite/taydenwhite.github.io/static/js/
cp dist/rubiks-listener.css /Users/taydenwhite/taydenwhite.github.io/static/js/
```

**Result:** Hugo can now serve these at `/js/rubiks-listener.js` and `/js/rubiks-listener.css`

---

### STEP 6: Add Shortcode to Rubik's Cubing Page

**Location:** `content/en/Projects/Rubik's Cubing/_index.md`

**Update the content:**

```markdown
---
title: Rubik's Cubing
description: Real-time Rubik's cube solve stream
weight: 40
---

Draft landing page for collecting methods, solve logs, and tooling related to speedcubing.

## Live Solve Stream

Below is a real-time stream of Rubik's cube solves:

{{< rubiks-listener apiUrl="https://your-backend.onrender.com" >}}
```

**Replace `https://your-backend.onrender.com`** with your actual deployed backend URL.

---

### STEP 7: Configure Backend CORS

**Location:** Your backend `server.js` or `index.js`

**Ensure CORS allows your Hugo site:**

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: [
      'http://localhost:1313',           // Hugo dev server
      'https://taydenwhite.github.io'    // Production site
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ... rest of your backend code
```

---

## Testing Locally

1. **Start your backend:**
   ```bash
   cd twitter-backend
   node server.js
   # Should run on http://localhost:3001
   ```

2. **Start Hugo server:**
   ```bash
   cd /Users/taydenwhite/taydenwhite.github.io
   hugo server
   ```

3. **Visit:** `http://localhost:1313/projects/rubiks-cubing/`

4. **Expected behavior:**
   - Page loads with "Real-Time Rubik's Cube Stream" heading
   - Socket connects to your backend
   - When backend emits 'tweet' events, they appear in real-time

---

## Deploying to Production

### Backend Deployment (Render Example)

1. Push your backend to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Note your Render URL (e.g., `https://rubiks-backend.onrender.com`)

### Update Hugo with Production URL

**In `content/en/Projects/Rubik's Cubing/_index.md`:**

```markdown
{{< rubiks-listener apiUrl="https://rubiks-backend.onrender.com" >}}
```

### Push to GitHub

```bash
cd /Users/taydenwhite/taydenwhite.github.io
git add .
git commit -m "Add Rubik's Cube Listener integration"
git push origin main
```

GitHub Pages will rebuild and your live site will have the working listener!

---

## File Summary

### React Project Files You Modified
- ✏️ `twitter-frontend/vite.config.js` - Build configuration
- ✏️ `twitter-frontend/src/main.jsx` - Mount point change
- ✏️ `twitter-frontend/src/App.jsx` - API URL from window global

### Files You Build
- 🔨 `dist/rubiks-listener.js` - Built React bundle
- 🔨 `dist/rubiks-listener.css` - Built styles

### Hugo Files Created (Already Done)
- ✅ `layouts/shortcodes/rubiks-listener.html` - Shortcode for embedding
- ✅ `INTEGRATION_GUIDE.md` - This guide

### Hugo Files You Need to Update
- ✏️ `content/en/Projects/Rubik's Cubing/_index.md` - Add the shortcode

### Files You Copy
- 📋 `dist/rubiks-listener.js` → `static/js/rubiks-listener.js`
- 📋 `dist/rubiks-listener.css` → `static/js/rubiks-listener.css`

---

## Quick Reference Commands

```bash
# Build React app
cd path/to/twitter-frontend
npm run build

# Copy to Hugo
cp dist/rubiks-listener.js /Users/taydenwhite/taydenwhite.github.io/static/js/
cp dist/rubiks-listener.css /Users/taydenwhite/taydenwhite.github.io/static/js/

# Test locally (if Hugo server not running)
cd /Users/taydenwhite/taydenwhite.github.io
hugo server
```

---

## Architecture Diagram

```
┌─────────────────────────────────────┐
│   Hugo Static Site (GitHub Pages)  │
│                                     │
│  Page: /projects/rubiks-cubing/    │
│  ┌───────────────────────────────┐ │
│  │ {{< rubiks-listener >}}       │ │
│  │                               │ │
│  │ <div id="rubiks-listener-     │ │
│  │      root">                   │ │
│  │   [React App Mounts Here]    │ │
│  │ </div>                        │ │
│  │                               │ │
│  │ <script src="/js/rubiks-      │ │
│  │         listener.js">         │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
              ↓ Socket.io WebSocket
┌─────────────────────────────────────┐
│   Node.js Backend (Render/Heroku)  │
│                                     │
│  - Express + Socket.io              │
│  - Emits 'tweet' events             │
│  - CORS allows taydenwhite.github.io│
└─────────────────────────────────────┘
```

---

## Need Help?

If you encounter issues:
1. Check browser DevTools Console for errors
2. Check Network tab to see if JS/CSS loaded
3. Verify backend is accessible (visit backend URL in browser)
4. Check backend logs for CORS errors

The integration is straightforward—your React app will work seamlessly once you build it with the new config and copy the files!

