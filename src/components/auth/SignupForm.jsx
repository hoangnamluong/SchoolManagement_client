import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import ContactsIcon from "@mui/icons-material/Contacts";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authForm.scss";
import { toast } from "react-toastify";
import { REGEX } from "../../config/regex";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Password } from "@mui/icons-material";

const {
  ACCENTED_LETTER_REGEX,
  CONTAIN_A_SPECIAL_CHARACTER,
  CONTAIN_A_LETTER,
  CONTAIN_A_NUMBER,
  CONTAIN_A_UPPERCASE,
  STRONG_PASSWORD,
} = REGEX;

const SignupForm = () => {
  const usernameRef = useRef();
  const fullnameRef = useRef();
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fullnameFormat = (str) => {
    if (!str) return;

    const splitStr = str.split(" ");

    const lastname = splitStr[splitStr.length - 1];
    splitStr.pop();
    const firstname = splitStr.join(" ");

    return {
      firstname,
      lastname,
    };
  };

  const validate = () => {
    console.log("run");

    const containsSpecialCharacter = CONTAIN_A_SPECIAL_CHARACTER.test(
      fullnameRef.current.value
    );

    if (containsSpecialCharacter) {
      setError("Fullname contains Special Characters");
      return true;
    }

    if (!STRONG_PASSWORD.test(password)) {
      setError("Password is not strong enough");
      return true;
    }

    const match = password === confirmPassword;

    if (!match) {
      setError("Passwords do not Match");
      setPassword("");
      setConfirmPassword("");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) return;

    const { firstname, lastname } = fullnameFormat(fullnameRef.current.value);

    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") e.preventDefault();
  };

  const onChangedPassword = (e) => setPassword(e.target.value);
  const onChangedConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h2">Password Requirements:</Popover.Header>
      <Popover.Body>
        <div className="password-requirement">
          {CONTAIN_A_LETTER.test(password) ? (
            <CheckCircleIcon />
          ) : (
            <CancelIcon />
          )}
          &nbsp;Must contain a letter
        </div>
        <div className="password-requirement">
          {CONTAIN_A_UPPERCASE.test(password) ? (
            <CheckCircleIcon />
          ) : (
            <CancelIcon />
          )}
          &nbsp;Must contain an uppercase letter
        </div>
        <div className="password-requirement">
          {CONTAIN_A_NUMBER.test(password) ? (
            <CheckCircleIcon />
          ) : (
            <CancelIcon />
          )}
          &nbsp;Must contain a number
        </div>
        <div className="password-requirement">
          {CONTAIN_A_SPECIAL_CHARACTER.test(password) ? (
            <CheckCircleIcon />
          ) : (
            <CancelIcon />
          )}
          &nbsp;Must contain a special letter
        </div>
        <div className="password-requirement">
          {password.length >= 8 ? <CheckCircleIcon /> : <CancelIcon />}
          &nbsp;At least 8 characters long
        </div>
      </Popover.Body>
    </Popover>
  );

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
          onKeyDown={handleKeyDown}
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
          onKeyDown={handleKeyDown}
        />
      </div>
      <OverlayTrigger trigger="focus" placement="top-start" overlay={popover}>
        <div className="input-container">
          <LockIcon />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangedPassword}
            required
            placeholder="Password"
            onKeyDown={handleKeyDown}
          />
        </div>
      </OverlayTrigger>
      <div className="input-container">
        <LockIcon />
        <input
          type="password"
          name="confirm-password"
          value={confirmPassword}
          onChange={onChangedConfirmPassword}
          required
          placeholder="Confirm password"
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && (
        <div className="error-message">
          <ErrorIcon />
          &nbsp;
          {error}
        </div>
      )}
      <button className="primary-btn w-100">Sign In</button>
    </form>
  );
};

export default SignupForm;
