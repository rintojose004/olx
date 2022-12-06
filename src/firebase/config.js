import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBikHCf3lS1DQNOBWjvZZLednGv82VotAE",
    authDomain: "olx-clone-2f8b0.firebaseapp.com",
    projectId: "olx-clone-2f8b0",
    storageBucket: "olx-clone-2f8b0.appspot.com",
    messagingSenderId: "717226980135",
    appId: "1:717226980135:web:cf2bde945ced9b56a02f02"
  };

  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);