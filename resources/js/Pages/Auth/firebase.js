// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBEtCyakifOCJYDklXWnDsAOwUQTrAblg4",
//   authDomain: "plearnai.firebaseapp.com",
//   projectId: "plearnai",
//   storageBucket: "plearnai.appspot.com",
//   messagingSenderId: "665370418912",
//   appId: "1:665370418912:web:0a88c5d8b86bbbf70cfa85"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// export { app, auth, googleProvider };
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBEtCyakifOCJYDklXWnDsAOwUQTrAblg4",
    authDomain: "plearnai.firebaseapp.com",
    projectId: "plearnai",
    storageBucket: "plearnai.appspot.com",
    messagingSenderId: "665370418912",
    appId: "1:665370418912:web:0a88c5d8b86bbbf70cfa85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);