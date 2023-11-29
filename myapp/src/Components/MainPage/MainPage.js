import React, {Children, Component} from "react";
import "./MainPage.css";
import Post from "../Post/Post";
import uploading from "../../images/upload.png"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { storage } from "../Firebase";

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = { 
            postArray :[],
            progressBar : "",
        }
    }

    componentDidMount(){
        const thisContext=this;
        thisContext.getPost();
    }

    getPost = () => {
        const thisContext = this;
        
        fetch('http://localhost:8080/post')
            .then(response => response.json())
            .then(data => {
                thisContext.setState({postArray: data});
        });
    }

    upload = (event) =>{
        let image=event.target.files[0];
        const thisContext = this;
        if(image == null || image == undefined){
            return;
        }
        const storageRef = ref(storage, 'images/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            function (snapshot){
                const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                thisContext.setState({progressBar : progress});
            },
            function (error) {

            },
            function (){
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);    

                    let payload = {
                        "postId" : Math.floor(Math.random() * 100000).toString(),
                        "userId" : JSON.parse(localStorage.getItem("users")).uid,
                        "postPath" : downloadURL,
                        "timeStamp" : new Date().getTime(),
                        "likeCount" : 0
                    }
                
                    const requestOptions = {
                        method: "POST",
                        headers : {"Content-Type" : "application/json"},
                        body : JSON.stringify(payload)
                    }

                    fetch("http://localhost:8080/post", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        thisContext.getPost();
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
                <div className="mainpage_uploadcontainer">
                    <div className="mainpage_uploadtext">Do you have some new photos? click this to create a new post</div>
                    <div className="fileupload">
                        <label for="file_upload">
                            <img className="mainpage_upload" src={uploading} />
                        </label>       
                        <input onChange={this.upload} id="file_upload" type="file" />
                    </div>
                </div>
                <div className="upload_progress_text">{this.state.progressBar}</div>
                <div>
                    {
                        this.state.postArray.map((item, index) => (
                            <Post id = {item.postId} userName = {item.userName} postImage={item.postPath} likes={item.likeCount} />
                        ))         
                    }
                </div>
            </div>
        );
    }
}

export default MainPage;