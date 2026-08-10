import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBta0_Du2YFAact4cc4WSXq9xDrvQUaK-4",
  authDomain: "formjmmb.firebaseapp.com",
  projectId: "formjmmb",
  storageBucket: "formjmmb.firebasestorage.app",
  messagingSenderId: "973531966538",
  appId: "1:973531966538:web:89bc60329ce038231a8ab3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);