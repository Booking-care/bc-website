import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { userService } from "../../services";

import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      isShowErrorMessage: false,
    };
  }

  handleOnChangeInput = (event, type) => {
    if (type === "username")
      this.setState({
        username: event.target.value,
      });
    else if (type === "password")
      this.setState({
        password: event.target.value,
      });
  };

  handleLogin = async () => {
    this.setState({
      errorMessage: "",
    });
    try {
      let data = await userService.handleLogin(
        this.state.username,
        this.state.password
      );
      if (data && data.errCode !== 0) {
        this.setState({
          errorMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.data);
      }
    } catch (e) {
      if (e.response && e.response.data) {
        this.setState({
          errorMessage: e.response.data.message,
        });
      }
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username ..."
                value={this.state.username}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "username")
                }
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password ..."
                value={this.state.password}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
              />
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errorMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login With:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
