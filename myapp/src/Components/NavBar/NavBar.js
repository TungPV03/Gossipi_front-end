import React, { Component } from "react";
import "./NavBar.css";
import { Grid, Button } from "@mui/material";
import logo from "../../images/logo.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    localStorage.removeItem("users");
    window.location.href = "/login";
  }

  render() {
    return (
      <div>
        <div className="navbar_barContent">
            <Grid container>
            <Grid item xs={2}>
                
            </Grid>

            <Grid item xs={6 }>
                <img className="navbar_logo" src={logo} width="105px"/>
            </Grid>

            <Grid item xs={3} style={{"display" : "flex"}}>
              <button className="log_out_button" onClick={this.handleLogout}>
               Log out
              </button>
            </Grid>

            <Grid item xs={1}>

            </Grid>
            </Grid>
        </div>
      </div>
    );
  }
}

export default NavBar;
