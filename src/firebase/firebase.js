import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDo3PWzbwp3U8V8YurssQWFcD1yhdUZU_0",
  authDomain: "pure-mart-be73c.firebaseapp.com",
  projectId: "pure-mart-be73c",
  storageBucket: "pure-mart-be73c.firebasestorage.app",
  messagingSenderId: "961654381128",
  appId: "1:961654381128:web:b87f882d4f2c71d43cd67d",
  measurementId: "G-Q66E552RFT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;
