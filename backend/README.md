# Real-Time Chat Application — Backend

Backend server for the Computer Network Term Project, developed using **Node.js, Express.js, Socket.IO, and MongoDB (Mongoose)**.

The backend is responsible for handling user connections, real-time messaging, group management, message persistence, and emoji reactions.

## Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── .env                  # Local environment variables (not committed)
│   │   ├── .env.example          # Environment variables template
│   │   └── db.js                 # MongoDB connection configuration
│   ├── middlewares/
│   │   └── socketAuth.js         # Socket authentication middleware
│   ├── models/
│   │   ├── User.js               # User profile and online status
│   │   ├── Group.js              # Group details and leader information
│   │   ├── GroupMessage.js       # Group messages and reactions
│   │   └── PrivateMessage.js     # Private messages and reactions
│   ├── sockets/
│   │   ├── index.js              # Central Socket.IO event dispatcher
│   │   ├── userHandler.js        # User-related socket events
│   │   ├── groupHandler.js       # Group management events
│   │   ├── groupChatHandler.js   # Group messaging and reactions
│   │   └── privateChatHandler.js # Private messaging events
│   ├── utils/
│   │   ├── cleanup.js            # Database cleanup utilities
│   │   ├── reactionHelper.js     # Emoji reaction utilities
│   │   └── socketError.js        # Socket error handling
│   ├── app.js                    # Express application and Socket.IO setup
│   └── server.js                 # Application entry point
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express.js | HTTP server and application setup |
| Socket.IO | Real-time bidirectional communication |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| dotenv | Environment variable management |

## Core Responsibilities

### User Management

- Handle user registration and profile retrieval.
- Track connected users and online status.
- Authenticate Socket.IO connections.

### Private Messaging

- Support real-time direct messaging between users.
- Store and retrieve private chat history.
- Support emoji reactions on messages.

### Group Management

- Create and manage chat groups.
- Handle group membership and user departures.
- Support group leader privileges, including group deletion.
- Transfer group leadership when the current leader leaves.

### Group Messaging

- Support real-time group messaging.
- Store and retrieve group chat history.
- Support emoji reactions on messages.

## Environment Variables

Create a `.env` file inside `src/config/` based on `.env.example`.

```env
NODE_ENV=development
PORT=5000

FRONTEND_URL=http://localhost:5173

MONGO_URI=mongodb+srv://<username>:<password>@chat-app-cluster.uocwvbt.mongodb.net/
```

### Environment Variable Reference

| Variable | Description |
| --- | --- |
| `NODE_ENV` | Application environment (`development` or `production`) |
| `PORT` | Port used by the backend server |
| `CLIENT_URL` | Allowed frontend origin for CORS |
| `MONGO_URI` | MongoDB connection URI |

**Important:**

- Never commit `.env` files or expose database credentials.
- Configure production environment variables through the hosting provider.
- Ensure the frontend origin matches the configured CORS origin.

## Getting Started

### 1. Install Dependencies

From the `backend/` directory, run:

```bash
npm install
```

### 2. Configure Environment Variables

Create `src/config/.env` and provide the required environment variables.

### 3. Run in Development Mode

```bash
npm run dev
```

### 4. Run in Production Mode

```bash
npm start
```

The server uses port `5000` by default when no other port is configured.

## Socket.IO Architecture

The backend uses a modular Socket.IO architecture to organize real-time event handling.

- `sockets/index.js` initializes and dispatches socket events.
- `userHandler.js` handles user-related events.
- `groupHandler.js` handles group creation, membership, and deletion.
- `groupChatHandler.js` handles group messages and reactions.
- `privateChatHandler.js` handles private messages and related events.
- `middlewares/socketAuth.js` handles socket connection authentication.

This structure separates event handling by responsibility, making the backend easier to maintain and extend.

## Deployment

The backend is deployed on **Render**.

### Render Environment Variables

Configure the following variables in the Render dashboard:

```env
NODE_ENV=production
MONGO_URI=<your-mongodb-atlas-uri>
CLIENT_URL=<your-deployed-frontend-origin>
```

Render provides the `PORT` environment variable automatically. The server should listen on `process.env.PORT` to support the hosting environment.

### Deployment Notes

- Ensure the MongoDB Atlas cluster allows connections from the Render service.
- Configure CORS to allow the deployed frontend origin.
- Keep production credentials in Render environment variables rather than committing them to Git.

## Security

- Protect database credentials and environment variables.
- Exclude `.env` files from version control.
- Restrict CORS to trusted frontend origins.
- Authenticate Socket.IO connections before processing protected events.
- Validate incoming socket event data before performing database operations.
