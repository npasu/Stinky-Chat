# Stinky Chat Frontend

Stinky Chat is a real-time chat application frontend built with React and Vite. It connects to a Socket.IO backend and provides a responsive user interface for private chats, group chats, online user discovery, and voice-to-text messaging.

This project is the client-side portion of the Stinky Chat system and is designed to work with a backend that exposes Socket.IO events for user, group, and message operations.

## Tech Stack

- React 19
- Vite
- React Router
- Socket.IO Client
- Tailwind CSS
- Lucide React
- react-speech-recognition

## Current Features

- Username entry screen with avatar selection
- Online friend list and group list views
- Private chat UI with direct messaging
- Group chat creation and join flow
- Group member viewing and leader-only group deletion
- Live message updates via Socket.IO
- Message reactions
- Voice input support for Thai speech recognition
- Responsive layout for desktop-style chat experience

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
├── README.md
├── vercel.json
├── vite.config.js
└── package-lock.json
```

## Environment Setup

Create a local environment file from the example:

```bash
cp .env.example .env
```

The app expects a Socket.IO backend URL in `.env`:

```env
VITE_SOCKET_URL=http://localhost:5000
```

If your backend runs elsewhere, replace the value accordingly.

## Prerequisites

- Node.js 18+
- npm
- A running Stinky Chat backend exposing Socket.IO on the configured URL

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

### Script descriptions

- `npm run dev` starts the Vite development server
- `npm run build` creates a production build
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint checks

## Running the App

1. Install dependencies:

```bash
npm install
```

2. Configure the backend URL in `.env`.

3. Start the backend server that the frontend should connect to.

4. Run the frontend:

```bash
npm run dev
```

5. Open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## App Flow

- The entry screen collects a username and avatar.
- After connection succeeds, the app navigates to the home screen.
- The home screen loads the current user profile, online users, and group list.
- Selecting a private contact or a group opens a chat page.
- Messages are sent through Socket.IO events and updated in real time.
- Group leaders can delete their group, while members can view group details.

## Deployment Notes

This frontend includes a Vercel rewrite config (`vercel.json`) so SPA routes are handled correctly.

For deployment, set the environment variable in the hosting platform:

```env
VITE_SOCKET_URL=https://your-socket-backend-url
```
