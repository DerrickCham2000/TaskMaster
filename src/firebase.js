
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
GoogleAuthProvider,
getAuth,
signInWithPopup,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
} from "firebase/auth";
import {
getFirestore,
query,
getDocs,
deleteDoc,
collection,
doc,
where,
addDoc,
} from "firebase/firestore";
// TODO: Change all error functions to display with states instead of alerts!

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIuemVQ9SoGvWhvpb144xWX2L4czLvKKY",
    authDomain: "derrick-cham-to-do-list.firebaseapp.com",
    projectId: "derrick-cham-to-do-list",
    storageBucket: "derrick-cham-to-do-list.appspot.com",
    messagingSenderId: "339546424591",
    appId: "1:339546424591:web:fb337f7b1b92a688446a7a"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password, setError) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};


const createTodo = async (user, todo) => {
    try {
        await addDoc(collection(db, "todo"), {
        uid: user.uid,
        todo,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const removeTodo = async (user, entryId) => {
    try {
        await deleteDoc(doc(db, "todo", entryId));
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    createTodo,
    removeTodo,
    logout,
};