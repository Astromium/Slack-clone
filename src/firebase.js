import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD_4OY6HS8KE5oAiQsiN9gVl3Ne6VAYSWg",
  authDomain: "slack-clone-a2a4f.firebaseapp.com",
  projectId: "slack-clone-a2a4f",
  storageBucket: "slack-clone-a2a4f.appspot.com",
  messagingSenderId: "42684678904",
  appId: "1:42684678904:web:b3712dddf1ff7002bcf10d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
//const provider = firebase.auth.GoogleAuthProvider();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
