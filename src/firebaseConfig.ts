import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDb7rr4nL1SmO5FL6k3Ic6m0Bto4mKFcIk",
  authDomain: "my-farm-guru.firebaseapp.com",
  projectId: "my-farm-guru",
  storageBucket: "my-farm-guru.appspot.com",
  messagingSenderId: "483406327834",
  appId: "1:483406327834:web:32034c97a3c1496b7261a3",
  measurementId: "G-3R37Z4Y936",
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
