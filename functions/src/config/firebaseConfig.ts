import * as firebase from "firebase";

const firebaseApp = firebase.initializeApp(
  JSON.parse(process.env.FIREBASE_CONFIG as string)
);

export const foodRef = firebaseApp.firestore().collection("food").doc("food");
