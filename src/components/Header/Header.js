import React, { Component } from "react";
import Login from "./Login/Login";
import UserMenu from "./Login/UserMenu";

export default class Header extends Component {
  render() {
    const { user } = this.props;
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
          {user ? <UserMenu /> : <Login />}
        </div>
      </nav>
    );
  }
}
