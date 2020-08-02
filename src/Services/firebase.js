import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD2s9G7wwDP2fxZCe-YA86vsedWhQn4Ov8",
    authDomain: "covid-pass-db.firebaseapp.com",
    databaseURL: "https://covid-pass-db.firebaseio.com",
    projectId: "covid-pass-db",
    storageBucket: "covid-pass-db.appspot.com",
    messagingSenderId: "206058915608",
    appId: "1:206058915608:web:903e7f6538547daa3d406d",
    measurementId: "G-QPFGVH5BEY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase.firestore().settings({ timestampsInSnapshots: true })
//   firebase.analytics();

export default firebase