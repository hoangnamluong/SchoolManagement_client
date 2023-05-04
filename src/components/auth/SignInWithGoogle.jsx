import Google from "../../assets/svg/google.svg";
import { auth, googleProvider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";

const SignInWithGoogle = () => {
  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
  };

  return (
    <>
      <button className="google-full" onClick={signInWithGoogle}>
        <img src={Google} width={30} height={30} />
        &nbsp; Sign in with google
      </button>
      <button className="google-short" onClick={signInWithGoogle}>
        <img src={Google} width={30} height={30} />
        &nbsp; Google
      </button>
    </>
  );
};
export default SignInWithGoogle;
