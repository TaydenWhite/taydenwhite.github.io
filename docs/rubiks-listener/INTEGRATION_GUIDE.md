# Rubik's Cube Listener - Hugo Integration Guide

## Overview
This guide explains how to integrate your React Rubik's Cube Listener into your Hugo static site.

## Step 1: Update Your React App for Hugo

### 1.1 Modify `App.jsx` to use Hugo's environment variable

```jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// Get API URL from Hugo-injected global or fallback
const API_URL = window.RUBIKS_API_URL || 'http://localhost:3001';
const socket = io(API_URL);

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    socket.on('tweet', (tweet) => {
      const newTweet = { ...tweet.data, user: tweet.includes.users[0] };
      setTweets(currentTweets => [newTweet, ...currentTweets]);
    });
    return () => { socket.disconnect(); };
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

### 1.2 Update `main.jsx` to mount to Hugo's div

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Mount to Hugo's provided root div
const rootElement = document.getElementById('rubiks-listener-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
```

### 1.3 Update `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'rubiks-listener.js',
        chunkFileNames: 'rubiks-listener-[name].js',
        assetFileNames: (assetInfo) => {
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

## Step 2: Build Your React App

In your `twitter-frontend` directory:

```bash
npm run build
```

This creates `dist/rubiks-listener.js` and `dist/rubiks-listener.css`

## Step 3: Copy Built Files to Hugo

Copy the built files to your Hugo static directory:

```bash
# From your twitter-frontend directory
cp dist/rubiks-listener.js /Users/taydenwhite/taydenwhite.github.io/static/js/
cp dist/rubiks-listener.css /Users/taydenwhite/taydenwhite.github.io/static/js/
```

## Step 4: Use the Shortcode in Your Hugo Page

I've already created the shortcode at `layouts/shortcodes/rubiks-listener.html`.

Now update your Rubik's Cubing page to use it:

**content/en/Projects/Rubik's Cubing/_index.md:**

```markdown
---
title: Rubik's Cubing
description: Real-time Rubik's cube solve stream
weight: 40
---

Draft landing page for collecting methods, solve logs, and tooling related to speedcubing.

## Live Solve Stream

{{< rubiks-listener apiUrl="YOUR_RENDER_BACKEND_URL" >}}
```

## Step 5: Backend CORS Configuration

Ensure your backend allows requests from your GitHub Pages domain:

```javascript
// In your backend server.js
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://localhost:1313',
      'https://taydenwhite.github.io'
    ],
    methods: ['GET', 'POST']
  }
});
```

## Step 6: Deploy Backend

Deploy your backend to Render/Heroku/Railway and note the URL (e.g., `https://your-app.onrender.com`).

## Step 7: Update Hugo Page with Production URL

Replace `YOUR_RENDER_BACKEND_URL` in the shortcode with your actual backend URL:

```markdown
{{< rubiks-listener apiUrl="https://your-app.onrender.com" >}}
```

## Troubleshooting

### Socket.io Not Connecting
- Check browser console for CORS errors
- Verify backend URL is correct
- Ensure backend is running and accessible

### React App Not Rendering
- Check if JS/CSS files are loading (Network tab in DevTools)
- Verify the div ID matches (`rubiks-listener-root`)
- Check console for React errors

### Build Issues
- Make sure all dependencies are installed: `npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Try a fresh build: `npm run build`

## Development Workflow

1. Make changes to your React app
2. Run `npm run build` in `twitter-frontend/`
3. Copy new files to Hugo's `static/js/`
4. Hugo server auto-reloads the page

## Future Enhancements

- Add build script to automate copying files
- Add loading states while connecting to socket
- Add error handling for connection failures
- Style tweets to match your site theme

