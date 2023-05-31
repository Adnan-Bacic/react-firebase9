import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDUxfJ3_Zbkbt25v5yliiwlZGZtFXQQbTQ",
    authDomain: "vue-3-firebase-9-reading-list.firebaseapp.com",
    projectId: "vue-3-firebase-9-reading-list",
    storageBucket: "vue-3-firebase-9-reading-list.appspot.com",
    messagingSenderId: "906312027929",
    appId: "1:906312027929:web:12caf1efadd71088723f88"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//firestore
const db = getFirestore();

//auth
const auth = getAuth()

export {
    db,
    auth,
}