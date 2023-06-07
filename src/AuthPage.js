import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'
import * as CryptoJS from 'crypto-js'

const AuthPage = ({ updateToken, secretKey }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setError(false)
    }, [email]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        const isInStorage = JSON.parse(localStorage.getItem(email))
        if (isInStorage) {
            setError(true)
        }
        else {
            const hashedPassword = bcrypt.hashSync(password)
            const payload = { name, email, hashedPassword }

            localStorage.setItem(email, JSON.stringify(payload))

            const token = CryptoJS.AES.encrypt(
                JSON.stringify(payload),
                secretKey
            ).toString();

            console.log(token)

            localStorage.setItem('token', JSON.stringify(token))
            updateToken()
        }

    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        const response = ({ name, email, password }, secretKey)

        localStorage.setItem(email, response);


    };

    return (
        <div className="container">
            <h2>Authentication</h2>
            {error &&
                <h1>User with this Email already exists</h1>
            }
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        name='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name='Password'
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleSignUp}>
                    Sign Up
                </button>
                <button className="btn btn-primary" onClick={handleSignIn}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default AuthPage