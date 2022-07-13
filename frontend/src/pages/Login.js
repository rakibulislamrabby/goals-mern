import React, { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
    const [fromData, setFromData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = fromData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFromData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <>
            <section className="heading">
                <h4><FaSignInAlt />Login</h4>
                <p>Please Login Your account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>

                    <div className='form-group'>
                        <input type="email" className='form-control' id='email' value={email} name="email" placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="password" className='form-control' id='password' value={password} name="password" placeholder='Enter your password' onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Login</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;