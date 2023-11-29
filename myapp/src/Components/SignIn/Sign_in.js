import React, {Component} from "react";
import "../Login_Page/Login_page.css";
import { storage, auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


class Sign_In extends Component{
    constructor(props){
        super(props);
        this.state = { 
            emailId : null,
            password: null
        }
    }

    login=() =>{
        signInWithEmailAndPassword(auth, this.state.emailId, this.state.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            localStorage.setItem("users", JSON.stringify(user));
            window.location.reload();
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    render() {
        return(
            <div>
                <input
                    className="loginpage_text"
                    onChange={(event) =>{ this.state.emailId = event.currentTarget.value}}
                    type="text"
                    placeholder="Username, phone number or email"
                  />
                  <input
                    className="loginpage_text"
                    onChange={(event) =>{ this.state.password = event.currentTarget.value}}
                    type="password"
                    placeholder="Password"
                  />
                  <button className="login_button" onClick={this.login}>Log in</button>
            </div>
        );
    } 
}

export default Sign_In;