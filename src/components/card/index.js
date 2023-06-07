import React from 'react';
import './card.css'

export const PostCard = ({ userId, id, title, body, viewPost, user, deletePost }) => {

    return (
        <div className="card margin-left" key={id} style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
                <div className='d-flex justify-content-center'>
                    <button onClick={() => viewPost(id)} className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2"> View Post</button>
                    {user?.email === userId ? (<button onClick={() => deletePost(id)} className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2"> Delete Post</button>)
                        : ('')}
                </div>


            </div>
        </div>
    )
}