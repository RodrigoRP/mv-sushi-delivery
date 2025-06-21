import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
// NOTA: Estas são chaves públicas e podem ser expostas no frontend
// const firebaseConfig = {
//   apiKey: "AIzaSyBtXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX",
//   authDomain: "mv-sushi-delivery.firebaseapp.com",
//   projectId: "mv-sushi-delivery",
//   storageBucket: "mv-sushi-delivery.appspot.com",
//   messagingSenderId: "123456789012",
//   appId: "1:123456789012:web:abcdefghijklmnopqr"
// };

// Configuração temporária para demo - você precisa substituir pelos valores reais
const demoConfig = {
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "mv-sushi-demo",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "000000000000",
  appId: "demo-app-id"
};

// Inicializar Firebase
const app = initializeApp(demoConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Exportar app para uso futuro
export default app;