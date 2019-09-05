import React, { Component } from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../../api/api";
import InputField from "./InputField";

export default class ModalLogin extends Component {
  state = {
    userName: "",
    password: "",
    repeatPassword: "",
    submitting: false,
    errors: {}
  };

  _isMounted = false;

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      }
    }));
  };

  handleBlur = e => {
    const errors = this.validateFields(e);
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

  validateFields = e => {
    const errors = {};
    const patternUserName = /^[a-zA-Z0-9]{6,}$/;
    const patternPassword = /(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;
    if (
      (e.target.id === "username" || e.target.type === "submit") &&
      !patternUserName.test(this.state.userName)
    ) {
      errors.userName = "Invalid username";
    }
    if (
      (e.target.id === "password" || e.target.type === "submit") &&
      !patternPassword.test(this.state.password)
    ) {
      errors.password = "Invalid password";
    }
    if (
      (e.target.id === "repeatPassword" || e.target.type === "submit") &&
      this.state.password !== this.state.repeatPassword
    ) {
      errors.repeatPassword = "Must be equal password";
    }
    return errors;
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validateFields(e);
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      this.onLogIn();
    }
  };

  onLogIn = () => {
    this.setState({
      submitting: true
    });

    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.userName,
              password: this.state.password,
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`
        );
      })
      .then(user => {
        this.props.updateUser(user);
        if (this._isMounted) {
          this.setState({
            submitting: false
          });
        }
      })
      .catch(error => {
        console.log("error", error);
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      userName,
      password,
      repeatPassword,
      submitting,
      errors
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <InputField
            title="User"
            type="text"
            id="username"
            placeholder="User"
            name="userName"
            value={userName}
            error={errors.userName}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          <InputField
            title="Password"
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            error={errors.password}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          <InputField
            title="Repeat password"
            type="password"
            id="repeatPassword"
            placeholder="Repeat password"
            name="repeatPassword"
            value={repeatPassword}
            error={errors.repeatPassword}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onSubmit}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}
