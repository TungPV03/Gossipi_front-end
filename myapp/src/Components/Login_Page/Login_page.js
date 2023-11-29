import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import logo from "../../images/logo.png";
import "./Login_page.css";
import Sign_in from "../SignIn/Sign_in.js";
import Sign_Up from "../SignUp/Sign_up";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }
  changeLogin = () =>{
    if(this.state.isLogin)
        this.setState({isLogin : false});
    else
        this.setState({isLogin : true}); 
  }

  render() {
    return (
      <div>
        <Grid container>

          <Grid item xs={3}>
          </Grid>

          <Grid item xs={6}>
            <div>
              <div className="loginpage_component">
                <img className="loginpage_logo" src={logo}></img>
                <div className="login_signin">
                  {this.state.isLogin ? <Sign_in /> : <Sign_Up />}
                </div>
                <div className="forgot_password">Forgot password?</div>
              </div>

              <div className="loginpage_signupoption">
                {this.state.isLogin ? (
                  <div className="loginpage_Signup">
                    Don't have a account?
                    <span onClick={this.changeLogin} style={{ fontWeight: "bold", color: "#0395F6" }}>
                      {" "}
                      Sign up
                    </span>
                  </div>
                ) : (
                  <div className="loginpage_Signin">
                    Have an account?
                    <span onClick={this.changeLogin} style={{ fontWeight: "bold", color: "#0395F6" }}>
                      {" "}
                      Sign in
                    </span>
                  </div>
                )}
              </div>

            </div>
          </Grid>

          <Grid item xs={3}>
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default LoginPage;
