//icon
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ErrorIcon from "@mui/icons-material/Error";

//hooks
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthSelector from "../../hooks/Selectors/useAuthSelector";

//thunks
import { login } from "../../features/auth/authSlice";

//scss
import "./authForm.scss";

//misc
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { REGEX } from "../../config/regex";
import usePersist from "../../hooks/usePersist";
import { Spinner } from "react-bootstrap";

const LoginForm = () => {
  const { ACCENTED_LETTER_REGEX } = REGEX;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");

  const { userInfo, status } = useAuthSelector();

  const [persist, setPersist] = usePersist();

  // const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accentedCheck = ACCENTED_LETTER_REGEX.test(usernameRef.current.value);

    if (!accentedCheck) {
      setError("Username or Password contains Accented Letter");
      return;
    }

    const form = new FormData();

    form.append("grant_type", "password");
    form.append("client_id", import.meta.env.VITE_CLIENT_ID);
    form.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
    form.append("username", usernameRef.current.value);
    form.append("password", passwordRef.current.value);

    dispatch(login(form));

    setError("");
  };

  useEffect(() => {
    if (status === "fulfilled" && userInfo) {
      navigate("/user/home");
      toast.success("Login Succeed");

      usernameRef.current.value = "";
      passwordRef.current.value = "";
    } else if (status === "rejected") {
      setError("Username or Password is Incorrect");

      passwordRef.current.value = "";
    }
  }, [status, userInfo]);

  const handleKeyDown = (e) => {
    if (e.code === "Space") e.preventDefault();
  };

  // useEffect(() => {
  //   if (isLoading) {
  //     toast.loading("Loading...", { toastId: "loading" });
  //   }
  //   if (isSuccess) {
  //     toast.dismiss("loading");
  //     toast.success("Login Success");
  //     navigate("/dash", { replace: true });
  //   }
  //   if (isError) {
  //     toast.dismiss("loading");
  //     toast.error("Username or password is incorrect");
  //   }
  // }, [isLoading, isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <div className="input-container">
        <PersonIcon />
        <input
          type="text"
          name="username"
          ref={usernameRef}
          required
          placeholder="Username"
          onKeyDown={handleKeyDown}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />
      </div>
      <div className="input-container mb-1">
        <LockIcon />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          required
          placeholder="Password"
          onKeyDown={handleKeyDown}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />
      </div>
      <div className="login-extra-actions disable-select">
        <div className="remember-me-button">
          <input
            type="checkbox"
            id="remember-me"
            checked={persist}
            onChange={() => setPersist((curr) => !curr)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <p className="fw-400">Forgot Password?</p>
      </div>
      {error && (
        <div className="error-message">
          <ErrorIcon />
          &nbsp;
          {error}
        </div>
      )}
      <button className="primary-btn w-100" disabled={status === "pending"}>
        {status === "pending" ? (
          <Spinner style={{ width: "20px", height: "20px" }} />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
