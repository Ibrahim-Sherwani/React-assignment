import React from "react";
import "./card.css";

export const CommentCard = ({
  currentPostId,
  postId,
  id,
  name,
  body,
  email,
  getUser,
  deleteComment,
  editComment,
}) => {
  let user;
  if (getUser) {
    user = getUser();
  }
  return (
    <>
      {currentPostId === postId ? (
        <div className="card margin-left" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <h5 className="card-title">{email}</h5>
            <p className="card-text">{body}</p>
            <div className="card-button">
              {user?.email === email ? (
                <>
                  <button
                    onClick={() => deleteComment(id)}
                    className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 m-1"
                  >
                    {" "}
                    Delete Comment
                  </button>

                  <button
                    onClick={() => editComment(id)}
                    className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 m-1"
                  >
                    {" "}
                    Edit Comment
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
