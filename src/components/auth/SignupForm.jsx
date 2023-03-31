import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./authForm.scss";
import { toast } from "react-toastify";

const SignupForm = () => {
  const usernameRef = useRef();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const match =
      passwordRef.current.value === confirmPasswordRef.current.value;

    if (!match) {
      toast.warn("Confirm Password does not match! Please check again.");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="input-container">
        <ContactsIcon />
        <input
          type="text"
          name="fullname"
          ref={fullnameRef}
          required
          placeholder="Fullname"
        />
      </div>
      <div className="input-container">
        <EmailIcon />
        <input
          type="email"
          name="lastname"
          ref={emailRef}
          required
          placeholder="Email"
        />
      </div>
      <div className="input-container">
        <PersonIcon />
        <input
          type="text"
          name="username"
          ref={usernameRef}
          required
          placeholder="Username"
        />
      </div>
      <div className="input-container">
        <LockIcon />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          required
          placeholder="Password"
        />
      </div>
      <div className="input-container">
        <LockIcon />
        <input
          type="password"
          name="confirm-password"
          ref={confirmPasswordRef}
          required
          placeholder="Confirm password"
        />
      </div>
      <button className="primary-btn w-100">Sign In</button>
    </form>
  );
};

export default SignupForm;
