# Melkamu Wako's Portfolio

Welcome to my professional portfolio website! This repository contains the source code for my personal portfolio website that showcases my skills, projects, and professional experience.

## 🏆 Project Overview

This portfolio website serves as a comprehensive showcase of my work, skills, and professional journey. It features a modern, responsive design with interactive elements to provide an engaging user experience. The website includes sections for projects, skills, experience, and a contact form for potential collaborations or job opportunities.

Key components include:
- Professional introduction and about section
- Interactive project showcase with live demos
- Skills and technologies I'm proficient in
- Professional experience and education
- Contact form for direct communication
- Blog section for sharing insights and tutorials

## 🚀 Features

- Responsive design
- Contact form functionality
- Newsletter subscription
- Project showcase
- Skills and experience display
- Interactive UI elements

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (for database)
- OpenAI API key (for chatbot functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Melke27/MyPortfolio.git
   cd MyPortfolio
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   - Create a `.env` file in the backend directory with the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     OPENAI_API_KEY=your_openai_api_key
     PORT=5000
     ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

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

## 👨‍💻 Author

**Melkamu Wako**

- 🌐 [Portfolio Website](https://melkamuwako27.netlify.app)
- 💼 [LinkedIn](https://linkedin.com/in/melkamu-wako-6a9b3b1b0/)
- 🐱 [GitHub](https://github.com/Melke27)
- 📧 Email: melkamuwako27@gmail.com
- 🐦 [Twitter](https://twitter.com/yourhandle)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Melke27/MyPortfolio/issues) if you would like to contribute.

## 📄 License

This project is [MIT](LICENSE.txt) licensed.

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- All the amazing open-source libraries and tools that made this project possible

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
