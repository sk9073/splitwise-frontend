import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5G44hX_pqz4K_MyhyzbgzBcvXbagQHsc",
  authDomain: "dup-splitwise.firebaseapp.com",
  projectId: "dup-splitwise",
  storageBucket: "dup-splitwise.firebasestorage.app",
  messagingSenderId: "660455500428",
  appId: "1:660455500428:web:2f980dc9479820988629a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Connect to emulator in development
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  connectAuthEmulator(auth, "http://localhost:9099");
}
