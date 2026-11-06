## Setup Frontend

```bash
cd frontend
npm install

# Start development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## Current structure for frontend

```text
frontend/
├── public/
├── src/
│ ├── assets/
│ │
│ ├── components/
│ │
│ ├── pages/
│ │
│ ├── hooks/
│ │ └── useSocket.js
│ │
│ ├── services/
│ │ └── api.js
│ │
│ ├── lib/
│ │ └── socket.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```
