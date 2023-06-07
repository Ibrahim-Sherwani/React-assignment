import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PostCard } from './components/card'


const PostsPage = () => {
    const { postId } = useParams();
    console.log(postId)
    const posts = JSON.parse(localStorage.getItem('posts'))
    console.log(posts[postId - 1])
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);


    // const handleClick = () => {
    //     handleLogout()
    //     navigate('/login');
    // }


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
                setComments(response.data);
                localStorage.setItem('comments', JSON.stringify(response.data))
            } catch (error) {
                // Handle error while fetching posts
            }
        };

        if (localStorage.getItem('comments')) {
            setComments(JSON.parse(localStorage.getItem('comments')))
        } else {
            fetchComments();
        }

    }, []);


    return (
        <div className="container-fluid" style={{ "padding": "0px" }}>
            <div className='d-flex justify-content-center'><h1>Posts</h1></div>
            <div className="row d-flex justify-content-center m-3">

                <PostCard id={posts[postId - 1].id} title={posts[postId - 1].title} body={posts[postId - 1].body}></PostCard>

            </div>
        </div>
    );
};

export default PostsPage;
