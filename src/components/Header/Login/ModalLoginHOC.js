import React from "react";
import CallApi from "../../../api/api";

export default Component =>
  class ModalLoginHOC extends React.Component {
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
        ...prevState,
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
          ...prevState,
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
          ...prevState,
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
        ...this.state,
        submitting: true
      });

      CallApi.get("/authentication/token/new")
        .then(data => {
          return CallApi.post("/authentication/token/validate_with_login", {
            body: {
              username: this.state.userName,
              password: this.state.password,
              request_token: data.request_token
            }
          });
        })
        .then(data => {
          return CallApi.post("/authentication/session/new", {
            body: {
              request_token: data.request_token
            }
          });
        })
        .then(data => {
          this.props.updateSessionId(data.session_id);
          return CallApi.get("/account", {
            params: {
              session_id: data.session_id
            }
          });
        })
        .then(user => {
          this.props.updateUser(user);
          this.props.toggleModal();
          if (this._isMounted) {
            this.setState({
              ...this.state,
              submitting: false
            });
          }
        })
        .catch(error => {
          console.log("error", error);
          this.setState({
            ...this.state,
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
        <Component
          userName={userName}
          password={password}
          repeatPassword={repeatPassword}
          submitting={submitting}
          onChange={this.onChange}
          handleBlur={this.handleBlur}
          onSubmit={this.onSubmit}
          errors={errors}
        />
      );
    }
  };
