import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../../components/postCard";
import useAxiosQuery from "../../hooks/useAxiosQuery";
import { POSTS, COMMENTS } from "../../components/constants";
import "./PostsPage.css";

const PostsPage = ({ getUser }) => {
  const navigate = useNavigate();

  const { data: posts, isLoading, setData: setPosts } = useAxiosQuery(POSTS);
  const [reload, setReload] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addButtonRef = useRef(null);

  const viewPost = (id) => {
    navigate("/posts/" + id);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const addPost = (e) => {
    e.preventDefault();

    const postData = posts;
    const user = getUser();

    const lastIndex = postData.length + 1;

    postData.push({
      title: title,
      body: body,
      userId: user.email,
      id: lastIndex,
    });

    localStorage.setItem(POSTS, JSON.stringify(postData));
    setPosts(postData);
    setTitle("");
    setBody("");
  };

  const deletePost = (id, edit = false) => {
    const postData = posts;
    let index = postData.findIndex((x) => x.id === id);

    if (!edit) {
      deletePostsComments(id);
    }

    postData.splice(index, 1);

    for (let i = index; i < postData.length; i++) {
      postData[i].id = postData[i].id - 1;
    }

    setPosts(postData);
    localStorage.setItem(POSTS, JSON.stringify(postData));
    setReload(reload + 1);
  };

  const deletePostsComments = (id) => {
    const commentData = JSON.parse(localStorage.getItem(COMMENTS));
    if (commentData) {
      let index = commentData.findIndex((x) => x.postId == id);
      while (index > 0) {
        commentData.splice(index, 1);
        index = commentData.findIndex((x) => x.postId == id);
      }
      localStorage.setItem(COMMENTS, JSON.stringify(commentData));
    }

    setReload(reload + 1);
  };

  const editPost = (id) => {
    const postData = posts;
    let index = postData.findIndex((x) => x.id === id);
    setTitle(postData[index].title);
    setBody(postData[index].body);
    deletePost(id, true);
    addButtonRef.current.focus();
  };

  return (
    <div className="container-fluid padding-unset">
      <div className="d-flex justify-content-center">
        <h1>Posts</h1>
      </div>

      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4 padding-left-unset">
              <div className="card mb-5 sm-3">
                <div className="card-body d-flex flex-column align-item-center card-styles">
                  <div className="row mb-2">
                    <div className="col-md-8 col-xl-6 text-center mx-auto">
                      <h3>Add a new Post</h3>
                      <p></p>
                    </div>
                  </div>
                  <form className="text-center" onSubmit={addPost}>
                    <div className="mb-3">
                      <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-100"
                        required
                      />
                    </div>
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
                        Add Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="row d-flex justify-content-center m-3">
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <PostCard
              key={post.id}
              userId={post.userId}
              id={post.id}
              title={post.title}
              body={post.body}
              viewPost={viewPost}
              getUser={getUser}
              deletePost={deletePost}
              editPost={editPost}
            ></PostCard>
          ))}
      </div>
    </div>
  );
};

export default PostsPage;
