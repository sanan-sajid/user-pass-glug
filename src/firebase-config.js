import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBiIN52GDPKJKZhdeLzvfTmjShTis6K8kc",
  authDomain: "user-pass-glug.firebaseapp.com",
  projectId: "user-pass-glug",
  storageBucket: "user-pass-glug.appspot.com",
  messagingSenderId: "1092493203444",
  appId: "1:1092493203444:web:56cc8dc5366405a245cba1",
  measurementId: "G-D55K495NWW",
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);