import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDG2QHRM98lEZI62ddHdFrAiqm2tzrd53s",
    authDomain: "curso-react-ad5ad.firebaseapp.com",
    projectId: "curso-react-ad5ad",
    storageBucket: "curso-react-ad5ad.appspot.com",
    messagingSenderId: "252312694460",
    appId: "1:252312694460:web:f1c38bb0fdf0f6f1eaeab9",
    measurementId: "G-83MXPEYME2"
  };
  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)
  export { db, auth }