import React, { Component } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import love from "../../images/love.svg";
import comment from "../../images/comment.svg";
import share from "../../images/share.svg";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      showAllComments: false,
      commentInput: "",
      userAvatar: "",
    };
  }

  componentDidMount() {
    this.getComments();
    this.getAvatar(this.props.userId);
  }

  getAvatar = (userId) => {
    fetch(`http://localhost:8080/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data && data.profileImage) {
          this.setState({ userAvatar: data.profileImage });
        } else {
          console.error("User data not available or incomplete");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  getComments = () => {
    fetch("http://localhost:8080/comments/" + this.props.id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ commentList: data });
      });
  };

  submitComments = (event) => {
    if (event.key === "Enter" && !event.repeat) {
      let comment = event.currentTarget.value;
      if (comment != null || comment != undefined) {
        let payload = {
          cmtId: Math.floor(Math.random() * 100000).toString(),
          userId: JSON.parse(localStorage.getItem("users")).uid,
          postId: this.props.id,
          timeStamp: new Date().getTime(),
          comment: comment,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };

        fetch("http://localhost:8080/comments", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.getComments();
          })
          .catch((error) => {});

        this.setState({ commentInput: "" });
      }
    }
  };

  render() {
    const { showAllComments, userAvatar } = this.state;
    return (
      <div className="post_container">
        {/* Header */}
        <div className="post_header">
          <Avatar className="post_img" src={userAvatar} />
          <div className="post_username">{this.props.userName}</div>
        </div>

        {/* Image */}
        <div>
          <img src={this.props.postImage} width="615px" alt="post" />
        </div>

        {/* Analytics */}
        <div>
          <div style={{ marginLeft: "10px" }}>
            <img src={love} className="post_react" alt="love" />
            <img src={comment} className="post_react" alt="comment" />
            <img src={share} className="post_react" alt="share" />
          </div>

          <div
            className="likecount"
            style={{ fontWeight: "bold", marginLeft: "10px" }}
          >
            {this.props.likes} likes
          </div>
        </div>

        {/* Comments */}
        <div>
          {showAllComments ? (
            this.state.commentList.map((item) => (
              <div key={item.cmtId} className="post_comment">
                <span className="comment_user">{item.userName}:</span>{" "}
                {item.comment}
              </div>
            ))
          ) : (
            this.state.commentList.slice(0, 5).map((item) => (
              <div key={item.cmtId} className="post_comment">
                <span className="comment_user">{item.userName}:</span>{" "}
                {item.comment}
              </div>
            ))
          )}
          <button
            className="show_allcomment_button"
            onClick={() => this.setState({ showAllComments: !showAllComments })}
          >
            ...
          </button>
          <input
            type="text"
            onKeyDown={this.submitComments}
            onChange={(event) =>
              this.setState({ commentInput: event.target.value })
            }
            value={this.state.commentInput}
            className="post_commentbox"
            placeholder="Add your comment..."
          />
        </div>
      </div>
    );
  }
}

export default Post;
