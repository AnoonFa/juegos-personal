import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgRoio1ViGyHy9Pl0j94P7m4FvV6j9tGs",
  authDomain: "appstorejuegos-1a66c.firebaseapp.com",
  databaseURL: "https://appstorejuegos-1a66c-default-rtdb.firebaseio.com",
  projectId: "appstorejuegos-1a66c",
  storageBucket: "appstorejuegos-1a66c.appspot.com",
  messagingSenderId: "1095253396640",
  appId: "1:1095253396640:web:642ddaeb67560b93fe8dc5",
  measurementId: "G-RXNL24XWN4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Asegúrate de exportar auth después de inicializarlo
export const db = getFirestore(app);

