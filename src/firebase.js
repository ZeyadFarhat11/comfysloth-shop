import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNVoQhJ0z07mBsGAUBFEno0zgMiVPO9Qo",
  authDomain: "comfy-sloth-furniture.firebaseapp.com",
  projectId: "comfy-sloth-furniture",
  storageBucket: "comfy-sloth-furniture.appspot.com",
  messagingSenderId: "865112231160",
  appId: "1:865112231160:web:2d9b98e9d43d3269d17f0d",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
