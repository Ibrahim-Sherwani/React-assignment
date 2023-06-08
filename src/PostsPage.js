import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PostCard } from "./components/card";
import useAxiosQuery from "./hooks/useAxiosQuery";

const PostsPage = ({ getUser, posts }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("hwllooo");
  const [body, setBody] = useState("world");

  useEffect(() => {}, [posts]);

  const viewPost = (id) => {
    navigate("/posts/" + id);
  };

  const addPost = () => {
    const postData = posts;
    const user = getUser();
    console.log(user, user?.email);

    console.log(typeof postData, postData);
    const lastIndex = postData.length + 1;
    postData.push({
      title: title,
      body: body,
      userId: user.email,
      id: lastIndex,
    });

    localStorage.setItem("posts", JSON.stringify([postData]));
    // setPosts(postData);
  };

  const deletePost = (id) => {
    const postData = posts;
    let index = postData.findIndex((x) => x.id === id);
    postData.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(postData));
    console.log(JSON.parse(localStorage.getItem("posts")));
  };

  const editPost = (id, title, body) => {
    const postData = JSON.parse(localStorage.getItem("posts"));
    let index = postData.findIndex((x) => x.id === id);
    postData[index] = {
      title: "title",
      body: body,
    };
    localStorage.setItem("posts", JSON.stringify(postData));
    console.log(JSON.parse(localStorage.getItem("posts")));
  };
  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      <button onClick={addPost}>help me plz</button>
      <div className="d-flex justify-content-center">
        <h1>Posts</h1>
      </div>
      {
        <div className="row d-flex justify-content-center m-3">
          {posts && posts.length > 0 ? (
            posts
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
                />
              ))
          ) : (
            <div>No posts to show</div>
          )}
        </div>
      }
    </div>
  );
};

export default PostsPage;
