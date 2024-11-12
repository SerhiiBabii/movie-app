import React from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";
import ModalLoginHOC from "./ModalLoginHOC";
import AppContextHOC from "../../HOC/AppContextHOC";

const ModalLogin = props => {
  const {
    userName,
    password,
    repeatPassword,
    submitting,
    errors,
    onChange,
    handleBlur,
    onSubmit
  } = props;
  return (
    <div className="form-login-container">
      <form className="form-login">
        <h1 className="h3 mb-3 font-weight-normal text-center">Authorization</h1>
        <InputField
          title="User"
          type="text"
          id="username"
          placeholder="User"
          name="userName"
          value={userName}
          error={errors.userName}
          onChange={onChange}
          onBlur={handleBlur}
        />
        <InputField
          title="Password"
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          error={errors.password}
          onChange={onChange}
          onBlur={handleBlur}
        />
        <InputField
          title="Repeat password"
          type="password"
          id="repeatPassword"
          placeholder="Repeat password"
          name="repeatPassword"
          value={repeatPassword}
          error={errors.repeatPassword}
          onChange={onChange}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className="btn btn-lg btn-primary btn-block"
          onClick={onSubmit}
          disabled={submitting}
        >
          Login
        </button>
        {errors.base && (
          <div className="invalid-feedback text-center">{errors.base}</div>
        )}
      </form>
    </div>
  );
};

ModalLogin.propTypes = {
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AppContextHOC(ModalLoginHOC(ModalLogin));
