//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyD73L1FQMEv_oSB-m7eibalaxVRETThvdo",
    authDomain: "fudget-3731c.firebaseapp.com",
    projectId: "fudget-3731c",
    storageBucket: "fudget-3731c.appspot.com",
    messagingSenderId: "17338469265",
    appId: "1:17338469265:web:ae3d36dd384cc5e5882830"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();