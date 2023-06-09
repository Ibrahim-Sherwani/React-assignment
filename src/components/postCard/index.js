import React from "react";
import "./card.css";

export const PostCard = ({
  userId,
  id,
  title,
  body,
  viewPost,
  getUser,
  deletePost,
  editPost,
}) => {
  let user;
  if (getUser) {
    user = getUser();
  }
  return (
    <div className="card margin-left" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
        <div className="card-button">
          {viewPost ? (
            <button
              onClick={() => viewPost(id)}
              className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 m-1"
            >
              {" "}
              View Post
            </button>
          ) : (
            " "
          )}
          {user?.email === userId ? (
            <>
              <button
                onClick={() => deletePost(id)}
                className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 m-1"
              >
                {" "}
                Delete Post
              </button>

              <button
                onClick={() => editPost(id)}
                className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 m-1"
              >
                {" "}
                Edit Post
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
