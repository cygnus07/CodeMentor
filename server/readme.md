# CodeMentor Server

Backend API for **CodeMentor** – An AI-powered coding assistant chatbot.

---

## 🚀 Features

- 🔐 JWT-based authentication  
- 💬 Real-time chat with OpenAI integration  
- 📝 Chat history persistence  
- 🧭 RESTful API with Express.js  
- 📊 MongoDB for data storage  
- 🔒 Security best practices (helmet, cors, rate limiting)

---

## 🛠️ Prerequisites

- Node.js 18+
- MongoDB
- OpenAI API Key

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd codementor/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Then open `.env` and configure the following:

- Your **MongoDB connection string**
- Your **OpenAI API key**
- Secure **JWT secrets**

---

## 🚧 Development

Start the development server:

```bash
npm run dev
```

The server will run on:  
👉 `http://localhost:5000`

---

## 📚 API Endpoints

### 🔐 Authentication

- `POST /api/auth/signup` – Register new user  
- `POST /api/auth/login` – Login user  
- `POST /api/auth/refresh` – Refresh access token  
- `GET /api/auth/profile` – Get user profile (Protected)

### 💬 Chat

- `POST /api/chats` – Create new chat  
- `GET /api/chats` – Get user's chats  
- `GET /api/chats/:chatId` – Get chat messages  
- `POST /api/chats/:chatId/messages` – Send message  
- `PATCH /api/chats/:chatId` – Update chat title  
- `DELETE /api/chats/:chatId` – Delete chat

### 🩺 Health

- `GET /api/health` – Health check endpoint

---

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript types
└── utils/           # Utility functions
```

---

## 🔐 Security

- Passwords hashed with **bcrypt**
- JWT tokens for authentication
- Rate limiting on all endpoints
- Input validation with **Zod**
- CORS protection
- **Helmet.js** for security headers

---

## ❗ Error Handling

Centralized error handling with custom error classes and appropriate HTTP status codes.

---

## 📄 License

**ISC**

---

## 🧱 Full Installation Steps (Root Project)

1. Create main project structure:

```bash
mkdir codementor
cd codementor
mkdir server client
```

2. Copy your existing server files to the `server` directory.

3. Install server dependencies:

```bash
cd server
npm install
```

4. Create a `.env` file based on `.env.example` and add your credentials.

5. Start the server:

```bash
npm run dev
```

Server runs on: **http://localhost:3000**

---

## ⏭️ Next Steps

Once the backend is running, you're ready to:

- Build the **Next.js** client
- Connect it to the authentication endpoints
- Enable real-time chat with OpenAI
- Manage secure user sessions

