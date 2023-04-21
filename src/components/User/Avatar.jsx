import React from "react";

let Avatar = ({ img, username }) => {
  return (
    <div
      className="avatar"
      style={{ backgroundImage: `url(${img})` }}
      alt={username}
    ></div>
  );
};

Avatar = React.memo(Avatar);
export default Avatar;
