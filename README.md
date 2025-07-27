# Melkamu Wako's Portfolio

Welcome to my professional portfolio website! This repository contains the source code for my personal portfolio website hosted on GitHub Pages.

## 🚀 Features

- Responsive design
- Contact form functionality
- Newsletter subscription
- Project showcase
- Skills and experience display
- Interactive UI elements

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Font Awesome
- Google Fonts
- Node.js (Backend)
- MongoDB (Database)

## 📁 Project Structure

```
MyPortfolio/
├── assets/            # Static assets (images, icons, etc.)
├── backend/           # Backend server code
├── frontend/          # Frontend source files
├── docs/              # Documentation
├── node_modules/      # Node.js dependencies
├── index.html         # Main portfolio page
├── blog-post.html     # Blog post template
├── calculator2.html   # Calculator application
├── privacy-policy.html # Privacy policy page
├── terms-of-service.html # Terms of service page
├── _config.yml        # Jekyll configuration
├── package.json       # Project dependencies
└── server.js          # Main server file
```

## 🔗 Live Demo

Visit my portfolio at: [https://melkamuwako27.netlify.app](https://melkamuwako27.netlify.app)

## 📫 Contact

Feel free to reach out to me through:
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

# Portfolio Deployment Guide

## Deploying the Frontend (Netlify)
1. Push your code to GitHub.
2. Go to [Netlify](https://netlify.com) and create a new site from GitHub.
3. Select your repo and deploy. Netlify will auto-detect your static site.
4. After deploy, copy your Netlify site URL (e.g., `https://your-portfolio.netlify.app`).

## Deploying the Backend (Render)
1. Push your backend code to GitHub.
2. Go to [Render](https://render.com) and create a new Web Service.
3. Connect your repo, set the root directory to `/backend` if needed.
4. Set environment variables:
   - `MONGODB_URI` = your MongoDB Atlas/Render connection string
   - `OPENAI_API_KEY` = your OpenAI API key
5. Deploy. After deploy, copy your Render backend URL (e.g., `https://your-backend.onrender.com`).

## Connecting Frontend to Backend
- In `index.html`, update the chatbot fetch URL to your Render backend `/chat` endpoint:
  ```js
  fetch('https://your-backend.onrender.com/chat', ...)
  ```
- Redeploy your frontend if you change this URL.

## How the Chatbot Works
- When you ask a question, the frontend sends it to the backend `/chat` endpoint.
- The backend first searches your MongoDB (BlogPosts, Projects) for a relevant answer.
- If found, it replies with your data. If not, it asks OpenAI for a smart answer.
- The answer is shown in your chat window.

## Troubleshooting
- Make sure your backend is live and accessible from Netlify.
- CORS must be enabled in your backend (already set in `ai-chat.js`).
- If you update environment variables, redeploy your backend.
