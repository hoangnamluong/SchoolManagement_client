import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";

const useFirebaseAuth = () => {
  const userRef = collection(db, "users");

  const addUser = async (user) => {
    try {
      const res = await addDoc(userRef, {
        ...user,
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return [addUser];
};
export default useFirebaseAuth;
