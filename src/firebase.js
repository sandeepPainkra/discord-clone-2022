import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDH4FgZMiOU-Ui0vmyfmDFmg4k7ex5NXRE",
  authDomain: "discord-clone-2022.firebaseapp.com",
  projectId: "discord-clone-2022",
  storageBucket: "discord-clone-2022.appspot.com",
  messagingSenderId: "107314344083",
  appId: "1:107314344083:web:d2bb629826c270a91a9d66",
  measurementId: "G-TN6N859FHV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export default db;
export { auth, provider };
