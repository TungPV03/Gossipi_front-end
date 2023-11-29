import React, {Component} from "react";
import "./Suggestions.css";
import { Avatar } from "@mui/material";
import srcImg from "../../images/pp1.png";

class Suggestions extends Component{
    constructor(props){
        super (props);
        this.state = { }
    }
    render (){
        return (
            <div>
                <div className="suggestion_container">
                    <div className="suggestion_header">
                        <div>Suggestions for you</div>
                    </div>

                    <div className="suggestion_body">
                        <div className="suggestion_friend">
                            <Avatar className="suggestion_img" src={srcImg} />
                            <div className="suggestion_username">Friend 1</div>
                        </div>
                        <div className="suggestion_friend">
                            <Avatar className="suggestion_img" src={srcImg} />
                            <div className="suggestion_username">Friend 2</div>
                        </div>
                        <div className="suggestion_friend">
                            <Avatar className="suggestion_img" src={srcImg} />
                            <div className="suggestion_username">Friend 3</div>
                        </div>
                        <div className="suggestion_friend">
                            <Avatar className="suggestion_img" src={srcImg} />
                            <div className="suggestion_username">Friend 4</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Suggestions;