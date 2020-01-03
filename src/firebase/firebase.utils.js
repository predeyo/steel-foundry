import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCv6Cj1feo1hHdJJKsLHHiRfGhSc5ADQkE",
  authDomain: "steel-foundry.firebaseapp.com",
  databaseURL: "https://steel-foundry.firebaseio.com",
  projectId: "steel-foundry",
  storageBucket: "steel-foundry.appspot.com",
  messagingSenderId: "604858344912",
  appId: "1:604858344912:web:db68872f9a0c96b53545d5",
  measurementId: "G-ZP25T5E7M4"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
