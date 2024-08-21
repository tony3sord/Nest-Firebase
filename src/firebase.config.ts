// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import {
  getDatabase,
  ref,
  get,
  connectDatabaseEmulator,
} from 'firebase/database';
import * as dotenv from 'dotenv';
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((isSupported) => {
    if (isSupported) {
      analytics = getAnalytics(app);
    }
  });
}

// Función para verificar la conexión con la base de datos de Firebase
async function verificarConexionFirebase() {
  const database = getDatabase(app);
  try {
    if (process.env.NODE_ENV === 'development') {
      const a = connectDatabaseEmulator(
        database,
        'localhost',
        parseInt(process.env.FIREBASE_PORT),
      );
      console.log(
        `Emulador de Firebase conectado en http://localhost:${parseInt(process.env.FIREBASE_PORT)}`,
        a,
      );
    } else {
      const testRef = ref(database, 'test/connection');
      const snapshot = await get(testRef);
      if (snapshot.exists()) {
        console.log('Conexión con Firebase establecida.');
      } else {
        console.log(
          'Conexión con Firebase establecida, pero la referencia de prueba no existe.',
        );
      }
    }
  } catch (error) {
    console.error('Error al verificar la conexión con Firebase:', error);
  }
}

verificarConexionFirebase();
