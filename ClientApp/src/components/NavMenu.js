import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import AuthContext, { AuthProvider } from "./auth";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            const user = value.user;

            const renderList = [
              <li key="1"><a href="/registerResturent">Register Restaurant</a></li>,
              <li key="2"><a  onClick={value.logOut} href="">Logout</a></li>,
            ]
            return (
              <header>
                <Navbar
                  className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                  container
                  light
                >
                  <div onClick={() => {window.location.href = "/"}} id="logo">Food Portal</div>
                  <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                  <ul className="navbar-nav flex-grow">
                  {user && renderList.map((i, j) => {return (i)})}

                    <li style={{ display: user ? "none" : "block" }}>
                      <a href="/register">Register</a>
                    </li>

                    <li style={{ display: user ? "none" : "block" }}>
                      <a href="/login">Login</a>
                    </li>
                  </ul>
                </Navbar>
              </header>
            );
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  }
}
