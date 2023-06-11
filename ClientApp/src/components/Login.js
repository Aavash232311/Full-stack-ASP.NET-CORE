import React, { Component } from "react";
import "../style/login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Services } from "../utils/services";
import AuthContext, { AuthProvider } from "./auth";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      errorRender: null,
    };
    this.utils = new Services();
    this.changeState = this.changeState.bind(this);
  }

  changeState(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    return (
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            const loginRequest = () => {
              if (this.state.username !== "" && this.state.password !== "") {
                value
                  .logIn(this.state.username, this.state.password)
                  .then((rsp) => {
                    if (rsp !== true) {
                      this.setState({ errorRender: true });
                    } else {
                      const urlParams = new URLSearchParams(
                        window.location.search
                      );
                      let myParam = urlParams.get("call");
                      if (myParam === null) { myParam = ""; }
                      window.location.href = this.utils.getClientDomain() + myParam;
                    }
                  });
              }
            };
            return (
              <div>
                <center>
                  <div id="loginFrame">
                    <center>
                      {" "}
                      <br />
                      <h5>Login</h5> <br />
                      <TextField
                        name="username"
                        className="input"
                        label="username"
                        variant="standard"
                        onInput={(ev) => {
                          this.changeState(ev);
                        }}
                      />{" "}
                      <br /> <br />
                      <TextField
                        name="password"
                        type="password"
                        className="input"
                        label="password"
                        variant="standard"
                        onInput={(ev) => {
                          this.changeState(ev);
                        }}
                      />{" "}
                      <br /> <br />
                      <div>
                        {this.state.errorRender && (
                          <Alert className="input" severity="warning">
                            username or paassword incorrect
                          </Alert>
                        )}
                      </div>
                      <br /> <br />
                      <Button
                        variant="contained"
                        color="success"
                        className="input"
                        onClick={loginRequest}
                      >
                        Success
                      </Button>
                    </center>
                  </div>
                </center>
              </div>
            );
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  }
}
