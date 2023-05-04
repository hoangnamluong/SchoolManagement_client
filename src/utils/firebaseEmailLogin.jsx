import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";
import apiEndpoints from "../config/apiEndpoints";
import useAxios from "../hooks/useAxios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const firebaseEmailLogin = () => {
  const connectToFirebase = async ({ email, password }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (res) {
        toast.success("Login Succeed");
      }
    } catch (err) {
      console.log(err.message);
      toast.info(
        "Something is wrong. You may not be able to use Chatting Room"
      );
    }
  };

  return connectToFirebase;
};
export default firebaseEmailLogin;
