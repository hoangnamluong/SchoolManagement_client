import "./profileForm.scss";

import ErrorIcon from "@mui/icons-material/Error";

import { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import apiEndpoints from "../../config/apiEndpoints";

const ProfileForm = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const genderRef = useRef();
  const avatarRef = useRef();

  const [error, setError] = useState("");

  const {
    data,
    status,
    error: axiosError,
  } = useAxios({
    url: apiEndpoints.user.concat("current-user/"),
    method: "get",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") e.preventDefault();
  };

  const handleKeyDownSpecialCharacter = (e) => {
    if (CONTAIN_A_SPECIAL_CHARACTER.test(e.key)) e.preventDefault();
  };

  useEffect(() => {
    if (data) {
      const { first_name, last_name, username, email, gender } = data;

      firstNameRef.current.value = data.first_name;
      lastNameRef.current.value = data.last_name;
      usernameRef.current.value = data.username;
      emailRef.current.value = data.email;
      genderRef.current = data.gender;
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex gap-5 mt-5">
        <div className="profile-management__input-container m-0">
          <input
            id="firstName"
            type="firstName"
            name="firstName"
            ref={firstNameRef}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor="email">First Name</label>
        </div>
        <div className="profile-management__input-container m-0">
          <input
            id="lastName"
            type="lastName"
            name="lastName"
            ref={lastNameRef}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor="email">Last Name</label>
        </div>
      </div>
      <div className="profile-management__input-container">
        <input
          id="username"
          type="text"
          name="username"
          ref={usernameRef}
          onKeyDown={(e) => {
            handleKeyDown(e);
            handleKeyDownSpecialCharacter(e);
          }}
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />
        <label htmlFor="username">Username</label>
      </div>
      <div className="profile-management__input-container">
        <input
          id="email"
          type="email"
          name="email"
          ref={emailRef}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="profile-management__input-container">
        <select id="gender" ref={genderRef}>
          <option value={false}>Female</option>
          <option value={true}>Male</option>
        </select>
        <label htmlFor="gender">Gender</label>
      </div>
      <div className="profile-management__input-container">
        <input id="avatar" type="file" name="avatar" ref={avatarRef} />
        <label>Avatar</label>
      </div>
      {error && (
        <div className="error-message">
          <ErrorIcon />
          &nbsp;
          {error}
        </div>
      )}
      <button className="primary-btn w-100">Save Changes</button>
    </form>
  );
};
export default ProfileForm;
