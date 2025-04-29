// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import database of firebase
import { getFirestore } from "firebase/firestore"

//Solução do problema com getAuth Firebase
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC3Sp8jJDr_Z9sQAe5AzTGIp2we_PPGe10",
//   authDomain: "miniblog-57344.firebaseapp.com",
//   projectId: "miniblog-57344",
//   storageBucket: "miniblog-57344.firebasestorage.app",
//   messagingSenderId: "515504224680",
//   appId: "1:515504224680:web:ea66b1c421ef1c91ac059d"
// };
// Using environment variables for Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o banco de dados do firebase / da firestore
const db = getFirestore(app);

/**
 * Firebase é um serviço do google, que tem vários outros serviços incluidos nele.
 * E um deles é o firestore, que é o banco de dados.
 * E temos tbm o serviço de autenticação do próprio firebase.
 */


// Solução do problema com getAuth Firebase
 /** Aviso do professor:
  * Pessoal, como o Firebase está em constante atualização, houve uma pequena modificação na forma de chamar a função getAuth - aula 145 - Solução do problema com o getAuth Firebase
  */
const auth = getAuth(app);

export { db, auth };