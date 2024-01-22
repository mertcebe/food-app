import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_lUuXAKrTzATn6uKyL1GF-UpId1UMH_k",
    authDomain: "food-app-fd554.firebaseapp.com",
    projectId: "food-app-fd554",
    storageBucket: "food-app-fd554.appspot.com",
    messagingSenderId: "904831239318",
    appId: "1:904831239318:web:51d5c2111abb878770aeb7",
    measurementId: "G-J3FHDMB7MQ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getFirestore(app);

export {database, auth};