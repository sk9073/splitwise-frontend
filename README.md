# Splitwise Frontend (React + Vite)

The user interface for the Splitwise Clone, integrated with Firebase Auth.

## 🛠 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Emulator
To test authentication locally without hitting live Firebase:
```bash
firebase emulators:start
```

### 3. Start Dev Server
```bash
npm run dev
```

## 🌐 Deployment (Firebase Hosting)

### 1. Build & Deploy
The `firebase.json` is configured with a `predeploy` hook that runs `npm run build` automatically.
```bash
npx firebase deploy --only hosting
```

### 2. Environment Variables
- `.env.local`: Used during `npm run dev`.
- `.env.production`: Used during `npm run build` for deployment.

## 🎨 Tech Highlights
- **Styled Components**: For modular, reusable styling.
- **Firebase Auth**: Google Sign-In and Email/Password flows.
- **API Service**: Centralized `src/services/api.js` with automatic token injection.
