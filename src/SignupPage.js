import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

const SignupPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false)
    }, [email]);

    const handleClick = () => navigate('/login');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isInStorage = JSON.parse(localStorage.getItem(email))
        if (!isInStorage) {
            const hashedPassword = bcrypt.hashSync(password)
            const payload = { name, email, hashedPassword }

            localStorage.setItem(email, JSON.stringify(payload))
            handleClick();
        }

        setError(true)
    };

    return (
        <div>
            <section className='py-4 py-xl-5'>
                <div className='container'>
                    <div className='row mb-5'>
                        <div className='col-md-8 col-xl-6 text-center mx-auto'>
                            <h2>Sign Up</h2>
                            <p></p>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-6 col-xl-4'>
                            <div className='card mb-5'>
                                <div className='card-body d-flex flex-column align-item-center' style={{ "margin-bottom": "-1px", "margin-top": "50px", "padding-top": "53px", "padding-bottom": "86px" }}>
                                    {error &&
                                        <h4>User with this Email already exists</h4>
                                    }
                                    <form className='text-center' onSubmit={handleSubmit}>
                                        <div className='mb-3'>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder='Name'
                                                value={name}
                                                onChange={handleNameChange}
                                                className='w-100'
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder='Email'
                                                value={email}
                                                onChange={handleEmailChange}
                                                className='w-100'
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <input
                                                type="password"
                                                id="password"
                                                placeholder='Password'
                                                value={password}
                                                onChange={handlePasswordChange}
                                                className='w-100 text-align-center'
                                            />
                                        </div>
                                        <div className='mb-3' style={{ "display": "unset" }}>
                                            <button className='btn btn-primary w-100' type="submit">Signup</button>
                                            <button className='btn btn-primary w-100' onClick={handleClick} style={{ 'margin-top': "10px" }}> Go To LogIn Page</button>
                                        </div>

                                    </form>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section >
        </div >
    );
};

export default SignupPage;
