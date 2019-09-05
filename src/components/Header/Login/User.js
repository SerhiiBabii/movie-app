import React from "react";

const User = ({ user }) => {
  return (
    <img
      width="40"
      className="rounded-circle"
      src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
      alt="avatar"
    />
  );
};

export default User;
