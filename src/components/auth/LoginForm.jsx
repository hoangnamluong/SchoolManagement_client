import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useRef } from "react";
import "./authForm.scss";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <form>
      <h2>Sign In</h2>
      <div className="input-container">
        <PersonIcon />
        <input
          type="email"
          name="email"
          ref={emailRef}
          required
          placeholder="Email"
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
      <p>Forgot Password?</p>
      <button className="primary-btn w-100">Sign In</button>
    </form>
  );
};

export default LoginForm;
