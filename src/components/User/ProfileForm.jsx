import "./profileForm.scss";

import ErrorIcon from "@mui/icons-material/Error";

import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import useUserSelector from "../../hooks/Selectors/useUserSelector";
import { updateCurrentUser } from "../../features/user/userSlice";

import convertObjectToFormData from "../../utils/convertObjectToFormData";

import { REGEX } from "../../config/regex";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const { currentUser, updateStatus, status, error } = useUserSelector();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const avatarRef = useRef();

  const [gender, setGender] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (avatarRef.current.files.length > 0) {
      if (
        avatarRef.current.files[0].type !== "image/png" &&
        avatarRef.current.files[0].type !== "image/jpg" &&
        avatarRef.current.files[0].type !== "image/jpeg"
      ) {
        return toast.warning("Incorrect Avatar type");
      }
    }

    const form = convertObjectToFormData({
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      username: usernameRef.current.value,
      avatar: avatarRef.current.files[0],
      gender: gender,
    });

    if (!form) return;

    dispatch(updateCurrentUser(form));

    avatarRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") e.preventDefault();
  };

  const handleKeyDownSpecialCharacter = (e) => {
    if (REGEX.CONTAIN_A_SPECIAL_CHARACTER.test(e.key)) e.preventDefault();
  };

  const onGenderChanged = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if (status === "fulfilled") {
      if (currentUser) {
        usernameRef.current.value = currentUser.username;
        firstNameRef.current.value = currentUser.first_name;
        lastNameRef.current.value = currentUser.last_name;
        emailRef.current.value = currentUser.email;
        setGender(currentUser.gender);
      }
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex gap-5 mt-5">
        <div className="profile-management__input-container m-0">
          <input
            id="firstName"
            type="text"
            name="firstName"
            ref={firstNameRef}
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        <div className="profile-management__input-container m-0">
          <input id="lastName" type="text" name="lastName" ref={lastNameRef} />
          <label htmlFor="lastName">Last Name</label>
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
          disabled
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="profile-management__input-container">
        <select id="gender" value={gender} onChange={onGenderChanged}>
          <option value={false}>Female</option>
          <option value={true}>Male</option>
        </select>
        <label htmlFor="gender">Gender</label>
      </div>
      <div className="profile-management__input-container">
        <input
          id="avatar"
          type="file"
          name="avatar"
          ref={avatarRef}
          accept="image/png, image/jpg, image/jpeg"
        />
        <label>Avatar</label>
      </div>
      {error && (
        <div className="error-message">
          <ErrorIcon />
          &nbsp;
          {error}
        </div>
      )}
      <button
        className="primary-btn w-100"
        disabled={updateStatus === "pending"}
      >
        {updateStatus === "pending" ? (
          <Spinner style={{ width: "20px", height: "20px" }} />
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
};
export default ProfileForm;
