
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCHD-y065KwE9hv2JRQmhlaXhCoOKvh6sg",
    authDomain: "chatbyte-feebb.firebaseapp.com",
    projectId: "chatbyte-feebb",
    storageBucket: "chatbyte-feebb.appspot.com",
    messagingSenderId: "532758127199",
    appId: "1:532758127199:web:849231a287591efa2431ea"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()