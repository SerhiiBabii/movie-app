import React, { Component } from "react";
import Login from "./Login/Login";
import User from "./Login/User";
import LogOut from "./Login/LogOut";

export default class Header extends Component {
  render() {
    const { user, updateUser, updateSessionId, onLogOut } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
          </ul>
          {user ? (
            <div>
              <User user={user} />
              <LogOut onLogOut={onLogOut} />
            </div>
          ) : (
            <Login updateUser={updateUser} updateSessionId={updateSessionId} />
          )}
        </div>
      </nav>
    );
  }
}
