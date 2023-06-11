import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import "./custom.css";
import { Services } from "./utils/services";
import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.utils = new Services();
    this.state = {
      render: false,
      loading: false,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("authToken");
    const setToken = () => {
      fetch(this.utils.getServer() + "/auth/RefreshToken", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      })
        .then((rsp) => rsp.json())
        .then((response) => {
          if (response.statusCode === 200) {
            localStorage.setItem("authToken", response.value);
          } else {
            localStorage.removeItem("authToken");
          }
        });
    };

    if (token !== null) {
      setToken();
      setInterval(() => {
        setToken();
      }, 540000);
    }
    this.utils.isLoggedIn().then((user) => {
      const val = user.value;
      this.setState({ isLoggedIn: val });
    });
    this.setState({ render: true });
  }

  render() {
    // login?call=/registerResturent
    const RouteStackMiddleware = (rest) => {
      const path = rest.path;
      const [loggedIn, setLoggedIn] = React.useState(null);
      if (rest.login) {
        // check if user is logged in or not by making api call which checks jwt token
        // if not logged in redirect somewhere else

        this.utils.isLoggedIn().then((user) => {
          const res = user.value;
          setLoggedIn(res);
        });
        if (loggedIn) {
          // check for roles
          const token = localStorage.getItem("authToken");
          const decoded = jwt_decode(token);
          for (const key in decoded) {
            if (
              key ===
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ) {
              const userRole = decoded[key];
              let roleMatch = false;
              const requiredRole = rest.roles;
              // if the page demanding the particular role lies in array
              for (let i = 0; i < requiredRole.length; i++) {
                const currRole = requiredRole[i];
                if (currRole === userRole) {
                  roleMatch = true;
                }
              }
              if (roleMatch === true) {
                return <Outlet />;
              } else if (roleMatch === false) {
                return (
                  <div>
                    <center>
                      <h6>404 page not found</h6>
                    </center>
                  </div>
                );
              }
            }
          }
          return <Outlet />;
        } else if (loggedIn === false) {
          return <div>Login required..</div>;
        } else {
          return <div></div>;
        }
      }
      return <Outlet />;
    };
    return (
      <div>
        {this.state.loading && (
          <div>
            <center>
              <h6>Loading ...</h6>
            </center>
          </div>
        )}

        {!this.state.loading && (
          <div>
            <Layout>
              <Routes>
                {AppRoutes.map((route, index) => {
                  // this part will be migrated above
                  const { element, login, roles, ...rest } = route;
                  return (
                    <Route
                      element={
                        <RouteStackMiddleware
                          path={rest.path}
                          roles={roles}
                          login={login}
                        />
                      }
                      key={index}
                    >
                      <Route {...rest} element={element} />
                    </Route>
                  );
                })}
              </Routes>
            </Layout>
          </div>
        )}
      </div>
    );
  }
}
