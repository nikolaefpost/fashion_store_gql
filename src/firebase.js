
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

console.log(process.env.REACT_APP_API_KEY)

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "fashion-store-auth-9ff12.firebaseapp.com",
    projectId: "fashion-store-auth-9ff12",
    storageBucket: "fashion-store-auth-9ff12.appspot.com",
    messagingSenderId: "853627412483",
    appId: "1:853627412483:web:1fdf53c07e3c9ab3622e36"
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();

export const auth = getAuth(app);