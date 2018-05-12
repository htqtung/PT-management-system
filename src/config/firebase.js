import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8zLzi-FWsoVgfvknPt9XCMtiBRVfIe7Y",
    authDomain: "pt-react-app.firebaseapp.com",
    databaseURL: "https://pt-react-app.firebaseio.com",
    projectId: "pt-react-app",
    storageBucket: "pt-react-app.appspot.com",
    messagingSenderId: "379223119945"
};
firebase.initializeApp(config);

export const firebaseAuth = firebase.auth;