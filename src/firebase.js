import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBU5p70l6khFrhNcedsMqWj3W-j2GcRya4",
    authDomain: "personal-training-370b1.firebaseapp.com",
    databaseURL: "https://personal-training-370b1.firebaseio.com",
    projectId: "personal-training-370b1",
    storageBucket: "personal-training-370b1.appspot.com",
    messagingSenderId: "607843834853"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export default firebase;
