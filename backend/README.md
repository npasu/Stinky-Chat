# Real-Time Chat Application - Backend

Backend server for the Computer Network Term Project built with **Node.js**, **Express**, **Socket.IO**, and **MongoDB (Mongoose)**. It provides real-time bi-directional communication, group management, message persistence, and emoji reactions.

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── config/               # Database connection & environment configuration
│   │   ├── .env              # Local environment variables (do NOT commit to Git)
│   │   ├── .env.example      # Template for required environment variables
│   │   └── db.js             # MongoDB connection setup with Google DNS fix
│   ├── models/               # Mongoose Data Schemas
│   │   ├── User.js           # User profile & online status schema
│   │   ├── Group.js          # Group details & leader info schema
│   │   ├── GroupMessage.js   # Group messages & emoji reactions schema
│   │   └── PrivateMessage.js # Direct messages & reactions schema
│   ├── sockets/              # Socket.IO Event Handlers (Modular architecture)
│   │   ├── index.js          # Central socket dispatcher
│   │   ├── userHandler.js    # User registration & online list events
│   │   ├── groupHandler.js   # Group creation & leader-only deletion events
│   │   └── chatHandler.js    # Messaging, history fetching & reaction events
│   ├── app.js                # Express application & Socket.IO configuration
│   └── server.js             # Application entry point (Database connection & HTTP server startup)
├── package-lock.json         # Dependency lockfile (Required for GitHub Actions CI)
├── package.json              # ES Modules configuration ("type": "module"), scripts & dependencies
└── README.md                 # Backend project documentation
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
