
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9vDtIft279tXtPhaeEcWwWJ2xGt1h7YQ",
  authDomain: "fir-notification-8fd1e.firebaseapp.com",
  projectId: "fir-notification-8fd1e",
  storageBucket: "fir-notification-8fd1e.appspot.com",
  messagingSenderId: "123086532204",
  appId: "1:123086532204:web:c970097cc8c493c4447249"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
