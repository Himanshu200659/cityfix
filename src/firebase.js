/* ============================================
   CITYFIX – Firebase Configuration
   ============================================
   Replace these values with your actual Firebase project credentials.
   To get these, go to: Firebase Console → Project Settings → General → Your apps → Config
*/

const firebaseConfig = {
  apiKey: "AIzaSyCQ1cc8A2Vd0MWHYYd891c-dh2VWv5hFtA",
  authDomain: "cityfix-12f8e.firebaseapp.com",
  databaseURL: "https://cityfix-12f8e-default-rtdb.firebaseio.com",
  projectId: "cityfix-12f8e",
  storageBucket: "cityfix-12f8e.firebasestorage.app",
  messagingSenderId: "668200888655",
  appId: "1:668200888655:web:8798edf0179a8fa4e4fd3a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export references
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const rtdb = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Firestore settings
db.settings({ timestampsInSnapshots: true });

console.log('🔥 Firebase initialized');
