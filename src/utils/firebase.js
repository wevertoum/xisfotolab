import firebase from "firebase";
import firebaseConfig from "../../firebaseConfig";
import "firebase/storage";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export const document = (documentPath = "", collectionPath = "") => {
  if (collectionPath?.length > 0) {
    return db.collection(collectionPath).doc(documentPath);
  } else return db.doc(documentPath);
};

export const collection = (collectionPath) => db.collection(collectionPath);

export default firebase;
