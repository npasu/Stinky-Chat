# Real-Time Chat Application (Computer Network Term Project)

A real-time chat application developed for the **Computer Network** course, focusing on **Socket Programming and real-time network communication** using Socket.IO.

The application enables multiple clients to communicate with each other through a client-server architecture, supporting full-duplex, bi-directional messaging, private conversations, and group chat rooms.

## Tech Stack

### **Backend**

- **Runtime:** Node.js
- **Framework:** Express.js
- **Real-time Engine:** Socket.IO
- **Database:** MongoDB with Mongoose
- **Environment Management:** dotenv

### **Frontend**

- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Real-time Connection:** Socket.IO Client
- **Speech Recognition:** Web Speech API via react-speech-recognition

## Repository Structure

```text
Stinky-Chat/
├── .github/
│   └── workflows/
│       └── backend-ci.yml              # Backend CI Pipeline
│
├── backend/                            # Node.js + Express + Socket.IO Server
│   ├── src/
│   │   ├── config/                     # Database and environment configuration
│   │   │   ├── .env                    # Local environment variables
│   │   │   ├── .env.example            # Environment variable template
│   │   │   └── db.js                   # MongoDB connection setup
│   │   │
│   │   ├── middlewares/
│   │   │   └── socketAuth.js           # Socket authentication middleware
│   │   │
│   │   ├── models/                     # Mongoose data schemas
│   │   │   ├── User.js
│   │   │   ├── Group.js
│   │   │   ├── GroupMessage.js
│   │   │   └── PrivateMessage.js
│   │   │
│   │   ├── sockets/                    # Modular Socket.IO event handlers
│   │   │   ├── index.js                # Central socket event dispatcher
│   │   │   ├── userHandler.js          # User and online presence events
│   │   │   ├── groupHandler.js         # Group management events
│   │   │   ├── groupChatHandler.js     # Group messaging events
│   │   │   └── privateChatHandler.js   # Private messaging events
│   │   │
│   │   ├── utils/                      # Shared utility functions
│   │   │   ├── cleanup.js
│   │   │   ├── reactionHelper.js
│   │   │   └── socketError.js
│   │   │
│   │   ├── app.js                      # Express and Socket.IO configuration
│   │   └── server.js                   # Application entry point
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── README.md                       # Backend documentation
│
├── frontend/                           # React + Vite Client
│   ├── public/                         # Static assets and icons
│   ├── src/
│   │   ├── components/                 # Reusable UI components
│   │   ├── hooks/                      # Custom React hooks
│   │   ├── lib/                        # Shared libraries and Socket.IO client
│   │   ├── pages/                      # Application pages
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   └── README.md                       # Frontend documentation
│
└── README.md                           # Main project documentation
```

## Network Protocols & Architecture

The application uses a client-server architecture with the following network protocols and technologies:

1. **TCP (Transport Layer):** Provides reliable, ordered, and error-checked data transmission between the client and server.
2. **HTTP / HTTPS (Application Layer):** Used for the initial connection and WebSocket handshake. HTTPS is used for secure communication in production.
3. **WebSocket (Application Layer):** Provides a persistent, full-duplex communication channel, allowing the client and server to exchange messages in real time without repeatedly establishing HTTP requests.
4. **Socket.IO:** Provides the real-time communication layer on top of the underlying transport. It uses WebSocket when available and can fall back to HTTP long-polling when necessary.

### **Communication Flow**

- The React frontend establishes a connection to the backend using Socket.IO Client.
- The Express backend hosts the Socket.IO server.
- Socket events are used to exchange messages and update real-time application states.
- MongoDB stores user, group, and message data for persistence across page reloads and reconnections.

## ✨ Features & Requirements Checklist

### **Part 1: System Architecture**

- [x] **R1:** Multi-client support across different devices through LAN or cloud deployment.
- [x] **R2:** Real-time client-server communication using Socket.IO events.

### **Part 2: Fundamental Implementation**

- [x] **R3:** Unique username validation.
- [x] **R4:** Real-time online user presence tracking.
- [x] **R5 & R6:** Separate interfaces for one-on-one private messaging and group chat rooms.
- [x] **R7:** Private direct messaging between the sender and the intended recipient.
- [x] **R8 & R9:** Group creation and group directory listing with member information.
- [x] **R10:** Explicit Join Group functionality.
- [x] **R11:** Group messaging restricted to users who have joined the group.

### **Part 3: Special Features**

- **Speech-to-Text:** Voice input recognition that converts spoken words into message text.
- **Chat History Persistence:** MongoDB integration to retain messages across page reloads and reconnections.
- **Group Leader Authority:** Only the group creator (Leader) has permission to delete the group.
- **Message Reactions:** Real-time emoji reactions on individual messages.

## Team Members

- 6730262921 - Napas Ruttanapunyagorn
- 6730265821 - Navaporn Homjandee
- 6731338121 - Pumwaree Pipithsuksunt
- 6731353521 - Siripudsorn Raksutakan

## Getting Started

### **Prerequisites**

- Node.js and npm
- MongoDB database (local instance or MongoDB Atlas)
- Git

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd Stinky-Chat
```

### **2. Setup Backend**

```bash
cd backend
npm install
```

Create the environment configuration file:

```bash
cp src/config/.env.example src/config/.env
```

Configure the required environment variables in `src/config/.env`, then start the backend:

```bash
npm run dev
```

The backend server will run at `http://localhost:5000`.

### **3. Setup Frontend**

Open another terminal:

```bash
cd frontend
npm install
```

Create the frontend environment file based on `.env.example` and configure the Socket.IO server URL:

```env
VITE_SOCKET_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend client will run at `http://localhost:5173`.

### **4. Access the Application**

Open the frontend URL in your browser:

```text
http://localhost:5173
```

Make sure both the backend and frontend servers are running.

## Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

For deployment configuration and environment variables, refer to the individual documentation:

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

---

**Note:** Do not commit `.env` files or expose database credentials and other sensitive environment variables in the repository.
