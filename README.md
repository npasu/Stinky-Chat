# Real-Time Chat Application (Computer Network Term Project)

A real-time chat application developed for the **Computer Network** course, focusing on **Socket Programming** via TCP/WebSocket protocols to enable full-duplex, bi-directional communication between the client and server.

## 🛠️ Tech Stack

### **Backend**

* **Runtime:** Node.js (Express)
* **Real-time Engine:** Socket.IO
* **Database:** MongoDB (Mongoose ORM)
* **Environment Management:** dotenv

### **Frontend**

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Real-time Connection:** Socket.IO Client

---

## 📁 Repository Structure

```text
/
├── backend/          # Node.js + Express + Socket.IO Server
│   ├── src/
│   │   ├── config/   # Environment variables & DB connection
│   │   ├── models/   # Mongoose Schemas (User, Group, Message)
│   │   ├── sockets/  # Socket.IO Event Handlers
│   │   └── server.js # Main Entry Point
│   ├── package.json
│   └── README.md
│
└── frontend/         # React + Vite + Tailwind CSS Client
    ├── src/
    ├── package.json
    └── README.md
```

---

## 🌐 Network Protocols & Architecture

This application utilizes network protocols across different layers to handle communication:

1. **TCP (Transport Layer):** Ensures reliable, ordered, and error-checked delivery of message packets between client and server.
2. **HTTP / HTTPS (Application Layer):** Handles initial HTTP handshakes to establish the WebSocket connection.
3. **WebSocket / Socket.IO Protocol (Application Layer):** Establishes a persistent, full-duplex, bi-directional connection for real-time messaging without requiring client polling or page reloads.

---

## ✨ Features & Requirements Checklist

### **Part 1: System Architecture**

* [x] **R1:** Multi-client support across different devices via LAN or Cloud deployment.
* [x] **R2:** Pure Socket Programming implementation for all message exchanges.

### **Part 2: Fundamental Implementation**

* [x] **R3:** Unique username validation.
* [x] **R4:** Real-time online user presence tracking.
* [x] **R5 & R6:** Separate UI views for 1-on-1 private messaging and group chat rooms.
* [x] **R7:** Private direct messaging delivered strictly between sender and recipient.
* [x] **R8 & R9:** Group creation and group directory listing with member lists.
* [x] **R10:** Explicit "Join Group" mechanism for users.
* [x] **R11:** Group messaging restricted only to users who joined the group.

### **Part 3: Special Features**

1. **AI Feature (Speech-to-Text):** Voice input recognition that converts speech into message text.
2. **Chat History Persistence:** MongoDB integration to retain chat history across reloads/reconnections.
3. **Group Leader Authority:** Administrative rights allowing only the group creator (Leader) to delete the group.
4. **Message Reactions:** Real-time emoji reaction feature on individual messages.

---

## 🚀 Getting Started

### **1. Setup Backend**

```bash
cd backend
npm install

# Copy environment variable configuration template
cp src/config/.env.example src/config/.env

# Run development server
npm run dev
```

The backend server will run at `http://localhost:5000`.

### **2. Setup Frontend**

```bash
cd frontend
npm install

# Run Vite development server
npm run dev
```

The frontend client will run at `http://localhost:5173`.

---

## 👥 Team Members

* 6730262921 - Napas Ruttanapunyagorn
* 6730265821 - Navaporn Homjandee
* 6731338121 - Pumwaree Pipithsuksunt
* 6731353521 - Siripudsorn Raksutakan
