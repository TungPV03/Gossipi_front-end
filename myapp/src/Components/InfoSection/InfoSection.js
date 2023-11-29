import React, {Component} from "react";
import "./InfoSection.css";
import { Avatar } from "@mui/material";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { storage } from "../Firebase";

class InfoSection extends Component{
    constructor(props){
        super (props);
        this.state = {
            name : '' ,
            username: '',
            avatar: '',
            description: ''
         }
    }

    componentDidMount() {
        this.getNameOfUser();
      }

    getNameOfUser = () => {
        const userId = JSON.parse(localStorage.getItem("users")).uid;
        fetch(`http://localhost:8080/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            if (data && data.name) {
                this.setState({ name: data.name });
                this.setState({avatar : data.profileImage});
                this.setState({username : data.userName});
            } else {
                console.error("User data not available or incomplete");
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }


    uploadAvatar = (event) => {
        const thisContext = this;
        const image = event.target.files[0];
        if (!image) {
            return;
        }
    
        const storageRef = ref(storage, 'avatars/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);
    
        uploadTask.on(
            "state_changed",
            function (snapshot) {

            },
            function (error) {
                console.error('Error uploading image:', error);
            },
            function () {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const userId = JSON.parse(localStorage.getItem('users')).uid;
                     
                    let payload = {
                        "profileImage" : downloadURL
                    }

                    const requestOptions = {
                        method: "PATCH",
                        headers : {"Content-Type" : "application/json"},
                        body : JSON.stringify(payload)
                    }

                    fetch(`http://localhost:8080/users/${userId}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        thisContext.getNameOfUser();
                    })
                    .catch(error => {
                
                    })
                })
                .catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }
        )
    }
    
    render (){
        return (
            <div>
                <div className="infor_container">
                    <label htmlFor="avatarInput">
                        <Avatar src={this.state.avatar} className="info_image" />
                        <input
                            type="file"
                            id="avatarInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={this.uploadAvatar}
                        />
                    </label>
                    <div className="content">
                        <div className="info_username">{this.state.name}</div>
                        <div className="info_description">User Name : {this.state.username}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoSection;