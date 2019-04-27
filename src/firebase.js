import * as firebase from 'firebase';

// Input your Firebase data here 
const config = {
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export default firebase;
