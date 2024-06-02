import React, { useState } from 'react';
import './loginsignup.css';
import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function LoginSignup() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [shown, setShown] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const togglePage = () => {
        setIsLogin(!isLogin);
    }
    const showErrorToast = () => {
        toast(`❌ Incorrect Username Or Password`, { style: { background: '#e5e5e5', color: 'red' } });
    }
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post('https://project-management-portal-eosin.vercel.app/login', {
                email,
                password
            });
    
            if (response.status === 200) {
                const { auth, token,user } = response.data;
                if (auth) {
                    // Save the token in local storage or context
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('email', user.email);
                    localStorage.setItem('id', user.id);
                    setTimeout(() => {
                        navigate('/dash');
                    }, 1000);
                    // Redirect to the home page or dashboard
                } else {
                    showErrorToast()
                }
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    };
    const handleRegister = async (username, email, password) => {
        try {
            const response = await axios.post('https://project-management-portal-eosin.vercel.app/register', {
                username,
                email,
                password
            });
    
            if (response.status === 200) {
                //reload the page
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    };

    return (
        <>
            <section>
                <div className='container'>
                    {isLogin ? (
                        <div className="right">

                            <div className="left">
                                <div className="box">
                                    <div className="title">
                                        <span className="block" />
                                        <h1>Planpro<span /></h1>
                                    </div>
                                    <div className="role">
                                        <div className="block" />
                                        <h3>Innovate.Organize.Succeed</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='inside-right'>
                                <div className="inside-container">
                                    <h2>Login</h2>
                                    <p>
                                        If you are already a member, easily login
                                    </p>
                                    <form className="form" onSubmit={(event) => {
                                        event.preventDefault();
                                        handleLogin(email, password);
                                    }}>
                                        <input
                                            className="e-input"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e)=>{setEmail(e.target.value)}}
                                        />
                                        <input
                                            className="p-input"
                                            type={shown ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e)=>{setPassword(e.target.value)}}

                                        />
                                        <FaEye className='hide-show' onClick={() => { setShown(!shown) }}></FaEye>
                                        <button className="btn">Login</button>
                                    </form>
                                    <div className="line-border">
                                        <hr /> <p>OR</p> <hr />
                                    </div>
                                    <button className="g-btn">
                                        <svg
                                            className="mr-3"
                                            viewBox="0 0 48 48"
                                            width="25px"
                                        >
                                            <path
                                                fill="#FFC107"
                                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                            />
                                            <path
                                                fill="#FF3D00"
                                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                            />
                                            <path
                                                fill="#4CAF50"
                                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                            />
                                            <path
                                                fill="#1976D2"
                                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                            />
                                        </svg>
                                        Login with Google
                                    </button>
                                    <div className="dha">
                                        <p>Don't have an account?</p>
                                        <button onClick={togglePage}>Sign up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="right">

                            <div className="left">
                                <div className="box">
                                    <div className="title">
                                        <span className="block" />
                                        <h1>Planpro<span /></h1>
                                    </div>
                                    <div className="role">
                                        <div className="block" />
                                        <h3>Innovate.Organize.Succeed</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='inside-right'>
                                <div className="inside-container">
                                    <h2>Sign up</h2>
                                    <p>
                                        Create your account
                                    </p>
                                    <form className="form" onSubmit={(event) => {
                                        event.preventDefault();
                                        handleRegister(username,email, password);
                                    }}>
                                        <input
                                            className="u-input"
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e)=>{setUsername(e.target.value)}}
                                        />
                                        <input
                                            className="e-input"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e)=>{setEmail(e.target.value)}}
                                        />
                                        <input
                                            className="p-input"
                                            type={shown ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e)=>{setPassword(e.target.value)}}
                                        />
                                        <FaEye className='hide-show2' onClick={() => { setShown(!shown) }}></FaEye>
                                        <button className="btn">
                                            Sign up
                                        </button>
                                    </form>
                                    <div className="line-border">
                                        <hr /> <p>OR</p> <hr />
                                    </div>
                                    <button className="g-btn">
                                        <svg
                                            className="mr-3"
                                            viewBox="0 0 48 48"
                                            width="25px"
                                        >
                                            <path
                                                fill="#FFC107"
                                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                            />
                                            <path
                                                fill="#FF3D00"
                                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                            />
                                            <path
                                                fill="#4CAF50"
                                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                            />
                                            <path
                                                fill="#1976D2"
                                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                            />
                                        </svg>
                                        Sign up with Google
                                    </button>
                                    <div className="dha">
                                        <p>Already have an account?</p>
                                        <button onClick={togglePage}>Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default LoginSignup