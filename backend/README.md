# Real-Time Chat Application - Backend

Backend server for the Computer Network Term Project built with **Node.js**, **Express**, **Socket.IO**, and **MongoDB (Mongoose)**. It provides real-time bi-directional communication, group management, message persistence, and emoji reactions.

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── config/          # Configuration files & database setup
│   │   ├── .env         # Local environment variables (do not commit)
│   │   ├── .env.example # Example template for environment keys
│   │   └── db.js        # MongoDB connection setup via Mongoose
│   ├── models/          # Mongoose Schemas (User, Group, Message)
│   │   ├── User.js
│   │   ├── Group.js
│   │   └── Message.js
│   ├── sockets/         # Socket.IO event handlers
│   └── server.js        # Main entry point (Express + Socket.IO)
├── package-lock.json
├── package.json         # Project metadata, dependencies, and scripts
└── README.md            # Backend documentation

```

---

## ⚙️ Environment Variables Setup

Copy `.env.example` to create a `.env` file and configure the values:

```env
NODE_ENV=development
PORT=5000

CLIENT_URL=http://localhost:5173

MONGO_URI=mongodb+srv://<username>:<password>@chat-app-cluster.uocwvbt.mongodb.net/
```

---

## 🚀 Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Run Server in Development Mode:**

   ```bash
   npm run dev
   ```

3. **Run Server in Production Mode:**

   ```bash
   npm start
   ```
