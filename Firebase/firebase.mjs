import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBoknXzjTvqiMZwlQIyLB7bAo7q5-oYtfg",
    authDomain: "javascript-projects-418a1.firebaseapp.com",
    projectId: "javascript-projects-418a1",
    storageBucket: "javascript-projects-418a1.appspot.com",
    messagingSenderId: "706290212672",
    appId: "1:706290212672:web:2be2ca50cfefb57f8f24a5"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
