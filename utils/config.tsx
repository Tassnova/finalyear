import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseCredentials = {
  // apiKey: process.env.FIREBASE_API_KEY,
  apiKey: "AIzaSyCXQoV09xumNSkiIYuG_PB2Gyaat9oEq18",
  authDomain: "crmproject-5abe1.firebaseapp.com",
  // projectId: process.env.FIREBASE_PROJECT_ID,
  projectId: "crmproject-5abe1",
  storageBucket: "crmproject-5abe1.appspot.com",
  messagingSenderId: "619156711306",
  appId: "1:619156711306:web:a047f538c56dfa3ea70a73",
  measurementId: "G-DN0ZWWM2D9",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCredentials);
}
const db = firebase.firestore();

export { db };
export default firebase;
