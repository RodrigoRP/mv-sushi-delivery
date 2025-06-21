import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
// NOTA: Estas são chaves públicas e podem ser expostas no frontend
const firebaseConfig = {
  apiKey: "AIzaSyAKaB9bPmcp9h_Qc6Rc-IYqSKo0BVa0778",
  authDomain: "mv-sushi-delivery.firebaseapp.com",
  projectId: "mv-sushi-delivery",
  storageBucket: "mv-sushi-delivery.firebasestorage.app",
  messagingSenderId: "558201432800",
  appId: "1:558201432800:web:5942dca627ee32081b3e85",
  measurementId: "G-WVZ0FRD514"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Exportar app para uso futuro
export default app;