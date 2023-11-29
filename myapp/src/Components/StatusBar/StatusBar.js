import React, {Component} from "react";
import "./StatusBar.css";
import { Avatar } from "@mui/material";
import statusing from "../../images/pp1.png";
import uploadImg from "../../images/statusadd.png"
import { storage } from "../Firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

class StatusBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            statusList: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () =>{
        fetch('http://localhost:8080/status')
            .then(response => response.json())
            .then(data => {
                this.setState({statusList: data});
        });
    }
    
    uploadStatus =(event)=>{
        let image=event.target.files[0];
        const thisContext = this;
        if(image == null || image == undefined){
            return;
        }
        const storageRef = ref(storage, 'status/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            function (snapshot){
            },
            function (error) {

            },
            function (){
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);    

                    let payload = {
                        "statusID" : Math.floor(Math.random() * 100000).toString(),
                        "userId" : JSON.parse(localStorage.getItem("users")).uid,
                        "path" : downloadURL,
                        "timeStamp" : new Date().getTime(),
                    }
                
                    const requestOptions = {
                        method: "POST",
                        headers : {"Content-Type" : "application/json"},
                        body : JSON.stringify(payload)
                    }

                    fetch("http://localhost:8080/status", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        thisContext.getData();
                    })
                    .catch(error => {
                
                    })
                })
            }
        );
    }

    render() {
        return (
            <div>
            <div className="statusbar__container">
            <div className="fileupload">
                <label for="file-upload-status" >
                    <img className="statusbar__upload" src={uploadImg} width="45px" height="45px" />
                </label>
                    <input id="file-upload-status" onChange={this.uploadStatus} type="file"/>
            </div>
                {
                    this.state.statusList.map((item,index)=>(
                        <div className="status">
                            <Avatar className="statusbar__status" src={item.path} />
                            <div className="statusbar__text">{item.userName}</div>
                        </div>
                    ))
                }
            </div>
        </div>
        );
    }
}

export default StatusBar;