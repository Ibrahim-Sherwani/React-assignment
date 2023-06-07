import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostCard } from './components/card'


const PostsPage = ({ getUser }) => {


    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');


    const viewPost = (id) => {
        navigate('/posts/' + id);
    }

    const addPost = (title, body) => {
        const postData = posts
        const user = getUser()
        console.log(user, user?.email)

        console.log(typeof (postData), postData)
        const lastIndex = postData.length + 1
        postData.push({
            title: title,
            body: body,
            userId: user.email,
            id: lastIndex
        })

        localStorage.setItem('posts', JSON.stringify([postData]))
        console.log(JSON.parse(localStorage.getItem('posts')))
    }

    const deletePost = (id) => {
        const postData = posts
        let index = postData.findIndex(x => x.id === id);
        postData.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(postData))
        console.log(JSON.parse(localStorage.getItem('posts')))
    }

    const editPost = (id, title, body) => {
        const postData = JSON.parse(localStorage.getItem('posts'))
        let index = postData.findIndex(x => x.id === id);
        postData[index] = {
            title: 'title',
            body: body,
        }
        localStorage.setItem('posts', JSON.stringify(postData))
        console.log(JSON.parse(localStorage.getItem('posts')))
    }


    const fetchPosts = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            console.log("prev", response?.data)
            response.data.push({ a: 3 })
            console.log(response.data)
            setPosts(response.data);
            localStorage.setItem('posts', JSON.stringify(response.data))
        } catch (error) {
            // Handle error while fetching posts
        }
    };

    useEffect(() => {
        // if (localStorage.getItem('posts')) {
        //     setPosts(JSON.parse(localStorage.getItem('posts')))


        // } else {
        //     // setTimeout(() => addPost('help', 'me', user), 6000);
        // }
        fetchPosts();
    }, []);


    // console.log(posts[0])
    // if (posts.length !== 0)
    //     addPost('hello', 'hellooooo')
    return (
        <div className="container-fluid" style={{ "padding": "0px" }}>
            <button onClick={addPost}>help me plz</button>
            <div className='d-flex justify-content-center'><h1>Posts</h1></div>
            <div className="row d-flex justify-content-center m-3">
                {posts.slice(0).reverse().map((post) => (
                    <PostCard userId={post.userId} id={post.id} title={post.title} body={post.body} viewPost={viewPost} getUser={getUser} deletePost={deletePost}></PostCard>
                ))}
            </div>
        </div>
    );
};

export default PostsPage;
