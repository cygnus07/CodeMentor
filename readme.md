# CodeMentor - AI-Powered Coding Assistant 🚀

<div align="center">
  <!-- <img src="screenshots/logo.png" alt="CodeMentor Logo" width="200" /> -->
  <p>
    <strong>Your intelligent coding companion powered by OpenAI</strong>
  </p>
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#screenshots">Screenshots</a> •
    <a href="#contributing">Contributing</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
  </p>
</div>

## 📖 Overview

CodeMentor is a modern, full-stack web application that provides AI-powered coding assistance. Built with Next.js, Express, MongoDB, and OpenAI's GPT, it offers real-time chat functionality with syntax highlighting, code formatting, and persistent conversation history.

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based auth with refresh tokens
- 💬 **Real-time AI Chat**: Powered by OpenAI GPT for intelligent responses
- 🎨 **Modern UI/UX**: Beautiful glass morphism design with smooth animations
- 📝 **Code Highlighting**: Syntax highlighting for multiple programming languages
- 💾 **Persistent History**: Save and manage all your conversations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🌓 **Dark/Light Mode**: Automatic theme detection and manual toggle
- ⚡ **Optimistic Updates**: Instant UI feedback for better user experience
- 🔍 **Markdown Support**: Rich text formatting in messages
- ⌨️ **Keyboard Shortcuts**: Quick actions for power users

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **AI Integration**: OpenAI API
- **Security**: Helmet, CORS, bcrypt
- **Validation**: Zod
- **Rate Limiting**: express-rate-limit

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- OpenAI API key
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codementor.git
   cd codementor

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**

   Backend (.env):
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `server/.env`:
   ```env
   # Server
   NODE_ENV=development
   PORT=5000

   # Database
   DATABASE_TYPE=mongodb
   MONGODB_URI=mongodb://localhost:27017/codementor

   # OpenAI
   OPENAI_API_KEY=your-openai-api-key
   OPENAI_MODEL=gpt-4-turbo-preview

   # Security
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   JWT_EXPIRES_IN=24h
   JWT_REFRESH_EXPIRES_IN=7d
   BCRYPT_ROUNDS=12

   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

   Frontend (.env.local):
   ```bash
   cd ../client
   echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
   ```

4. **Run the application**

   In separate terminals:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📸 Screenshots

<div align="center">
  <img src="screenshots/login.png" alt="Login Page" width="400" />
  <p><em>Login Page with Glass Morphism Design</em></p>
</div>

<div align="center">
  <img src="screenshots/signup.png" alt="Signup Page" width="400" />
  <p><em>Signup Page</em></p>
</div>

<div align="center">
  <img src="screenshots/profile.png" alt="Profile Page" width="400" />
  <p><em>User Profile Dashboard</em></p>
</div>

<div align="center">
  <img src="screenshots/chat-empty.png" alt="Empty Chat" width="400" />
  <p><em>Chat Interface - Empty State</em></p>
</div>

<div align="center">
  <img src="screenshots/chat-conversation.png" alt="Chat Conversation" width="400" />
  <p><em>Active Chat Conversation with Code Highlighting</em></p>
</div>

<div align="center">
  <img src="screenshots/chat-mobile.png" alt="Mobile View" width="200" />
  <p><em>Mobile Responsive Design</em></p>
</div>

## 🏗️ Project Structure

```
codementor/
├── client/                    # Next.js frontend
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities and hooks
│   └── public/              # Static assets
└── server/                   # Express backend
    ├── src/
    │   ├── controllers/      # Route controllers
    │   ├── models/          # MongoDB models
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic
    │   └── middleware/      # Express middleware
    └── dist/                # Compiled JavaScript
```

## 🔧 Configuration

### Frontend Configuration
- Modify `tailwind.config.js` for custom styling
- Update `next.config.js` for Next.js settings
- Customize theme in `app/globals.css`

### Backend Configuration
- Adjust rate limiting in `app.ts`
- Modify OpenAI settings in `services/openai.service.ts`
- Configure CORS origins for production

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/profile` - Get user profile

### Chat Endpoints
- `POST /api/chats` - Create new chat
- `GET /api/chats` - Get user's chats
- `GET /api/chats/:id` - Get chat messages
- `POST /api/chats/:id/messages` - Send message
- `PATCH /api/chats/:id` - Update chat title
- `DELETE /api/chats/:id` - Delete chat

## 🚢 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your platform
2. Ensure MongoDB Atlas connection
3. Update CORS origins for production

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Set `NEXT_PUBLIC_API_URL` to production API
3. Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Next.js team for the amazing framework
- All contributors and users of CodeMentor

## 📞 Support

For support, email kuldeepsingh21070@gmail.com or open an issue in this repository.

---

<div align="center">
  Made with ❤️ by Kuldeep Singh
  <br />
  <a href="https://github.com/cygnus07/codementor">⭐ Star this repository</a>
</div>
```

