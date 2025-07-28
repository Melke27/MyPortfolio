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
- AI-powered chatbot for interactive user experience
- Newsletter subscription functionality

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Bootstrap framework
- **Interactive UI**: Smooth animations and transitions
- **Contact Form**: Integrated with Brevo (Sendinblue) email service
- **AI Chatbot**: OpenAI-powered conversational interface
- **Project Showcase**: Dynamic project gallery with filtering
- **Blog System**: Content management for articles and tutorials
- **Newsletter Subscription**: Email marketing integration
- **SEO Optimized**: Meta tags, sitemap, and structured data
- **Performance Optimized**: Minified assets and lazy loading

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (for database)
- OpenAI API key (for chatbot functionality)
- Brevo (Sendinblue) API key (for email functionality)

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
   
   # Install frontend dependencies (React app)
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   - Copy `backend/env.example` to `backend/.env`
   - Update the `.env` file with your actual API keys and configuration:
     ```
     # Database Configuration
     MONGODB_URI=your_mongodb_connection_string
     
     # Server Configuration
     PORT=10000
     NODE_ENV=development
     
     # Authentication
     JWT_SECRET=your_jwt_secret_key_here
     
     # Email Services
     BREVO_API_KEY=your_brevo_api_key_here
     
     # AI Services
     OPENAI_API_KEY=your_openai_api_key_here
     OPENROUTER_API_KEY=your_openrouter_api_key_here
     
     # External APIs
     WEATHER_API_KEY=your_openweathermap_api_key_here
     GNEWS_API_KEY=your_gnews_api_key_here
     
     # Telegram Bot (Optional)
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
     TELEGRAM_CHAT_ID=your_telegram_chat_id_here
     ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # or for development with auto-reload
   npm run dev
   ```

2. **Start the frontend development server (React)**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**
   - Main Portfolio: `http://localhost:3000` (React frontend)
   - Static Portfolio: `http://localhost:5000` (Express server)
   - Backend API: `http://localhost:5000/api`

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Interactive functionality
- **Bootstrap 5** - Responsive framework
- **Font Awesome** - Icon library
- **Google Fonts** - Typography
- **React** - Frontend framework (in frontend directory)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **OpenAI API** - AI chatbot functionality
- **Brevo (Sendinblue)** - Email service
- **Nodemailer** - Email handling
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Development server with auto-reload
- **Dotenv** - Environment variable management
- **Body-parser** - Request parsing

## 📁 Project Structure

```
MyPortfolio/
├── assets/                    # Static assets
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript files
│   ├── img/                  # Images and icons
│   ├── lib/                  # Third-party libraries
│   └── webfonts/            # Font files
├── backend/                  # Backend server
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── frontend/            # React frontend
│   ├── server.js            # Main server file
│   ├── simple-chat.js       # AI chatbot logic
│   ├── brevo-contact.js     # Email functionality
│   └── seed.js              # Database seeding
├── frontend/                 # React application
│   ├── public/              # Static files
│   └── src/                 # React components
├── docs/                     # Documentation
├── index.html               # Main portfolio page
├── blog-post.html           # Blog template
├── calculator2.html         # Calculator app
├── privacy-policy.html      # Privacy policy
├── terms-of-service.html    # Terms of service
├── 404.html                 # Custom 404 page
├── _config.yml              # Jekyll configuration
├── _headers                 # Netlify headers
├── _redirects               # URL redirects
├── sitemap.xml              # SEO sitemap
├── package.json             # Root dependencies
└── server.js                # Root server file
```

## 🔗 Live Demo

Visit my portfolio at: [https://melkamuwako27.netlify.app](https://melkamuwako27.netlify.app)

## 👨‍💻 Author

**Melkamu Wako**

- 🌐 [Portfolio Website](https://melkamuwako27.netlify.app)
- 💼 [LinkedIn](https://linkedin.com/in/melkamu-wako-6a9b3b1b0/)
- 🐱 [GitHub](https://github.com/Melke27)
- 📧 Email: melkamuwako27@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Melke27/MyPortfolio/issues) if you would like to contribute.

## 📄 License

This project is [MIT](LICENSE.txt) licensed.

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) - Responsive framework
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography
- [OpenAI](https://openai.com/) - AI chatbot functionality
- [Brevo](https://www.brevo.com/) - Email service
- All the amazing open-source libraries and tools that made this project possible

## 🚀 Deployment Guide

### Deploying the Frontend (Netlify)
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and create a new site from GitHub
3. Select your repo and deploy. Netlify will auto-detect your static site
4. After deploy, copy your Netlify site URL (e.g., `https://your-portfolio.netlify.app`)

### Deploying the Backend (Render/Railway)
1. Push your backend code to GitHub
2. Go to [Render](https://render.com) or [Railway](https://railway.app) and create a new Web Service
3. Connect your repo, set the root directory to `/backend` if needed
4. Set environment variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `OPENAI_API_KEY` = your OpenAI API key
   - `OPENROUTER_API_KEY` = your OpenRouter API key
   - `BREVO_API_KEY` = your Brevo API key
   - `JWT_SECRET` = your JWT secret key
   - `WEATHER_API_KEY` = your OpenWeatherMap API key
   - `GNEWS_API_KEY` = your GNews API key
   - `TELEGRAM_BOT_TOKEN` = your Telegram bot token (optional)
   - `TELEGRAM_CHAT_ID` = your Telegram chat ID (optional)
5. Deploy and copy your backend URL (e.g., `https://your-backend.onrender.com`)

### Connecting Frontend to Backend
- Update API endpoints in your frontend code to point to your deployed backend
- Ensure CORS is properly configured in your backend
- Test all functionality after deployment

## 🔧 API Endpoints

### Contact Form
- `POST /api/contact` - Send contact form data via Brevo

### AI Chatbot
- `POST /api/chat` - Process chat messages with OpenAI

### Blog Posts
- `GET /api/blog` - Retrieve blog posts
- `POST /api/blog` - Create new blog post

### Projects
- `GET /api/projects` - Retrieve project data
- `POST /api/projects` - Create new project

## 🐛 Troubleshooting

- **CORS Issues**: Ensure CORS is enabled in your backend server
- **Environment Variables**: Double-check all API keys are correctly set
- **Database Connection**: Verify MongoDB connection string is correct
- **Email Service**: Test Brevo API key and email templates
- **AI Chatbot**: Ensure OpenAI API key is valid and has sufficient credits

## 📈 Performance Optimization

- Minified CSS and JavaScript files
- Optimized images with WebP format
- Lazy loading for images
- CDN for external libraries
- Gzip compression enabled
- Browser caching configured

## 🔒 Security

### Environment Variables
This project uses environment variables for all sensitive configuration. **Never commit `.env` files to version control.**

**Required Environment Variables:**
- `MONGODB_URI` - Database connection string
- `JWT_SECRET` - Secret key for JWT authentication
- `BREVO_API_KEY` - Email service API key
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `OPENROUTER_API_KEY` - OpenRouter API key for AI chat
- `WEATHER_API_KEY` - OpenWeatherMap API key
- `GNEWS_API_KEY` - GNews API key for tech news

### Security Features
- ✅ No hardcoded API keys or secrets
- ✅ All sensitive data in environment variables
- ✅ JWT-based authentication
- ✅ Input validation and sanitization
- ✅ CORS properly configured
- ✅ Error handling without exposing sensitive information

### Setup Security
1. Copy `backend/env.example` to `backend/.env`
2. Fill in your actual API keys and secrets
3. Never commit the `.env` file
4. Use different API keys for development and production

**⚠️ Important:** The test files (`backend/test-brevo.js`, `backend/test-endpoint.js`) may contain example credentials and should be removed or cleaned before sharing publicly.
