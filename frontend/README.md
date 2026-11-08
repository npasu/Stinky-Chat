# Stinky Chat — Frontend

Frontend application for Stinky Chat, a real-time chat application built with **React 19 and Vite**.

The frontend provides an interactive chat interface for private messaging, group conversations, online user discovery, and voice-to-text input. It communicates with the backend through Socket.IO Client.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based UI development |
| Vite | Development server and build tool |
| React Router | Client-side routing |
| Socket.IO Client | Real-time communication with the backend |
| Tailwind CSS | Utility-first CSS styling |
| Lucide React | Icon library |
| react-speech-recognition | Voice-to-text input |

## Features

- **User Entry:** Username entry and avatar selection.
- **Online Users:** View available users and their online status.
- **Private Chat:** Send and receive direct messages in real time.
- **Group Chat:** Create groups, join conversations, and view group members.
- **Group Management:** View group details and support leader-only group deletion.
- **Message Reactions:** React to messages using emojis.
- **Voice Input:** Convert Thai speech into text using speech recognition.
- **Responsive Interface:** Chat-oriented layout with reusable UI components.

## Project Structure

```text
frontend/
├── public/
│   ├── ear.svg
│   ├── favicon.svg
│   ├── profile0.svg
│   ├── profile1.svg
│   ├── profile2.svg
│   ├── profile3.svg
│   ├── profile4.svg
│   ├── profile5.svg
│   ├── tail.svg
│   └── ...
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── ChatList.jsx
│   │   ├── CreateGroupPopUp.jsx
│   │   ├── DeleteGroupPopUp.jsx
│   │   ├── SelectButton.jsx
│   │   ├── TextInput.jsx
│   │   ├── ViewMembersPopUp.jsx
│   │   └── Chatpage/
│   │       ├── BlankChat.jsx
│   │       ├── ChatBox.jsx
│   │       ├── ChatFooter.jsx
│   │       └── ChatHeader.jsx
│   ├── hooks/
│   │   └── useSocket.js
│   ├── lib/
│   │   └── socket.js
│   ├── pages/
│   │   ├── Chat.jsx
│   │   ├── Entry.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

## Prerequisites

Before running the frontend, make sure you have:

- Node.js 18 or later
- npm
- A running Stinky Chat backend with Socket.IO enabled

## Environment Variables

Create a local `.env` file in the `frontend/` directory based on `.env.example`.

```env
VITE_SOCKET_URL=http://localhost:5000
```

| Variable | Description |
|---|---|
| `VITE_SOCKET_URL` | URL of the backend Socket.IO server |

**Important:**

- Vite exposes environment variables to client-side code only when they use the `VITE_` prefix.
- Never store secrets or private credentials in frontend environment variables.
- Update the backend URL when connecting to a different environment.

## Getting Started

### 1. Install Dependencies

From the `frontend/` directory, run:

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env` and set `VITE_SOCKET_URL` to your backend URL.

For local development:

```env
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Start the Backend

Make sure the backend server is running and accessible at the configured URL.

### 4. Run the Development Server

```bash
npm run dev
```

Vite will start the development server. Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

## Application Structure

The frontend follows a component-based architecture.

- **`pages/`** — Main application pages, including user entry, home, and chat.
- **`components/`** — Reusable UI components, chat interfaces, and popups.
- **`hooks/`** — Custom React hooks for managing application behavior.
- **`lib/`** — Shared utilities and Socket.IO client configuration.
- **`public/`** — Static assets such as avatars, icons, and the website favicon.

### Socket.IO Integration

The frontend uses Socket.IO Client to communicate with the backend.

- `lib/socket.js` initializes the Socket.IO client.
- `hooks/useSocket.js` manages connection state and socket event listeners.
- Application pages emit and listen for events to handle user activity, private messages, group messages, and reactions.

## Deployment

The frontend is deployed on **Vercel**.

### Vercel Configuration

Set the following environment variable in the Vercel project settings:

```env
VITE_SOCKET_URL=https://<your-render-backend-domain>
```

Make sure the URL points to the deployed backend Socket.IO server.

### Deployment Notes

- Vite environment variables are embedded during the build process. Redeploy the frontend after changing environment variables.
- Ensure the backend CORS configuration allows the deployed frontend origin.
- The project includes `vercel.json` to configure SPA routing and support client-side navigation.
- Push changes to the connected Git repository to trigger a new deployment.

## Production Build

To generate a production build locally:

```bash
npm run build
```

To preview the generated build:

```bash
npm run preview
```

The production output is generated in the `dist/` directory.
