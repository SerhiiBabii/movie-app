import React from "react";

const LogOut = ({ onLogOut }) => {
  return (
    <button
      className="btn btn-info text-center"
      type="button"
      onClick={onLogOut}
    >
      Log Out
    </button>
  );
};

export default LogOut;
