import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "./components/postCard";
import useAxiosQuery from "./hooks/useAxiosQuery";
import { CommentCard } from "./components/commentCard";

const PostsPage = ({ getUser }) => {
  const addButtonRef = useRef(null);

  const {
    data: comments,
    isLoading,
    setData: setComments,
  } = useAxiosQuery("comments");

  const [body, setBody] = useState("");
  const [reload, setReload] = useState(0);

  const { postId } = useParams();
  const posts = JSON.parse(localStorage.getItem("posts"));

  const addComment = (e) => {
    e.preventDefault();

    const commentData = comments;
    const user = getUser();

    const lastIndex = commentData.length + 1;

    commentData.push({
      name: user.name,
      body: body,
      email: user.email,
      postId: postId,
      id: lastIndex,
    });

    localStorage.setItem("comments", JSON.stringify(commentData));
    setComments(commentData);
    setBody("");
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const deleteComment = (id) => {
    const commentData = comments;
    const index = commentData.findIndex((x) => x.id === id);
    commentData.splice(index, 1);
    setComments(commentData);
    localStorage.setItem("comments", JSON.stringify(commentData));
    setReload(reload + 1);
  };

  const editComment = (id) => {
    const commentData = comments;
    let index = commentData.findIndex((x) => x.id === id);
    setBody(commentData[index].body);
    deleteComment(id);
    addButtonRef.current.focus();
  };

  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      <div className="d-flex justify-content-center">
        <h1>Post</h1>
      </div>
      <div className="row d-flex justify-content-center m-3">
        <PostCard
          key={postId}
          userId={posts[postId - 1].userId}
          id={postId}
          title={posts[postId - 1].title}
          body={posts[postId - 1].body}
        ></PostCard>

        <section className="py-4 py-xl-5" style={{ paddingLeft: "0px" }}>
          <div className="container" style={{ paddingLeft: "0px" }}>
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 col-xl-4" style={{ paddingLeft: "0px" }}>
                <div className="card mb-5 sm-3">
                  <div
                    className="card-body d-flex flex-column align-item-center"
                    style={{
                      marginBottom: "-1px",
                      marginTop: "50px",
                      paddingTop: "53px",
                      paddingBottom: "86px",
                    }}
                  >
                    <div className="row mb-2">
                      <div className="col-md-8 col-xl-6 text-center mx-auto">
                        <h3>Add a new Comment</h3>
                        <p></p>
                      </div>
                    </div>
                    <form className="text-center" onSubmit={addComment}>
                      <div className="mb-3">
                        <input
                          type="text"
                          id="body"
                          placeholder="Body"
                          value={body}
                          onChange={handleBodyChange}
                          className="w-100 text-align-center"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <button
                          ref={addButtonRef}
                          className="btn btn-primary w-100"
                          type="submit"
                        >
                          Add Comment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="d-flex justify-content-center">
        <h1>Comments</h1>
      </div>
      <div className="row d-flex justify-content-center m-3">
        {comments
          .slice(0)
          .reverse()
          .map((comment) => (
            <CommentCard
              key={comment.id}
              currentPostId={postId}
              postId={comment.postId}
              id={comment.id}
              name={comment.name}
              body={comment.body}
              email={comment.email}
              getUser={getUser}
              deleteComment={deleteComment}
              editComment={editComment}
            ></CommentCard>
          ))}
      </div>
    </div>
  );
};

export default PostsPage;
