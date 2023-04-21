import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import ContactsIcon from "@mui/icons-material/Contacts";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authForm.scss";
import { toast } from "react-toastify";
import { REGEX } from "../../config/regex";
import { OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import useAxiosLazy from "../../hooks/useAxiosLazy";
import apiEndpoints from "../../config/apiEndpoints";

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
  const avatarRef = useRef();

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fetch, { data, status, error: axiosError }] = useAxiosLazy({
    url: apiEndpoints.user,
    method: "post",
    options: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  const fullnameFormat = (str) => {
    if (!str) return;

    const splitStr = str.split(" ");

    if (splitStr.length === 1) return { lastname: splitStr[0] };

    const lastname = splitStr[splitStr.length - 1];
    splitStr.pop();
    const firstname = splitStr.join(" ");

    return {
      firstname,
      lastname,
    };
  };

  const validate = () => {
    const containsSpecialCharacter = CONTAIN_A_SPECIAL_CHARACTER.test(
      fullnameRef.current.value
    );

    if (containsSpecialCharacter) {
      setError("Fullname contains Special Characters");
      return true;
    }

    const accentedCheck = ACCENTED_LETTER_REGEX.test(usernameRef.current.value);

    if (!accentedCheck) {
      setError("Username contains Accented Letter");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) return;

    const { firstname, lastname } = fullnameFormat(fullnameRef.current.value);

    const form = new FormData();
    form.append("first_name", firstname);
    form.append("last_name", lastname);
    form.append("username", usernameRef.current.value);
    form.append("email", emailRef.current.value);
    form.append("password", password);
    form.append("avatar", avatarRef.current.files[0]);

    fetch(form);

    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") e.preventDefault();
  };

  const handleKeyDownSpecialCharacter = (e) => {
    if (CONTAIN_A_SPECIAL_CHARACTER.test(e.key)) e.preventDefault();
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
          onKeyDown={handleKeyDownSpecialCharacter}
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
          onKeyDown={(e) => {
            handleKeyDown(e);
            handleKeyDownSpecialCharacter(e);
          }}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
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
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
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
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />
      </div>
      <div className="input-container">
        <AccountCircleIcon />
        <input type="file" name="avatar" ref={avatarRef} required />
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
          "Sign up"
        )}
      </button>
    </form>
  );
};

export default SignupForm;
