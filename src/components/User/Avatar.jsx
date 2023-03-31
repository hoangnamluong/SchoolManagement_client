import React from "react";

let Avatar = ({ img }) => {
  return (
    <img
      src={img}
      width={50}
      height={50}
      style={{ borderRadius: `50%` }}
      alt="User Avatar"
    />
  );
};

Avatar = React.memo(Avatar);
export default Avatar;
