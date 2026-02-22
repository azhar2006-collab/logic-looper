import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6r7cAiqfxoEJbKdJZzyGpZHDXHd7VbFA",
  authDomain: "server-app-job-e56f3.firebaseapp.com",
  projectId: "server-app-job-e56f3",
  storageBucket: "server-app-job-e56f3.firebasestorage.app",
  messagingSenderId: "390993729998",
  appId: "1:390993729998:web:7b7bab3da8f00748e5b39f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
