import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

apiKey: "AIzaSyAaBRt_uKXAn9-MNiXc-RDdgk48-ztr_A",
authDomain: "airbeatfestivalqr.firebaseapp.com",
projectId: "airbeatfestivalqr",
storageBucket: "airbeatfestivalqr.firebasestorage.app",
messagingSenderId: "529699781521",
appId: "1:529699781521:web:369f5ebaf711d9076c3830"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export {
db,
doc,
getDoc,
setDoc,
updateDoc,
increment,
onSnapshot
};
