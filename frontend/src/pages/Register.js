import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';
import { register, reset } from '../features/auth/authSlice';

const Register = () => {
    const [fromData, setFromData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = fromData;

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
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }
            dispatch(register(userData));
        }
    }
    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <>
            <section className="heading">
                <h4><FaUser />Register</h4>
                <p>Please Create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type="text" className='form-control' id='name' value={name} name="name" placeholder='Enter your Name' onChange={onChange} autocomplete="off" />
                    </div>
                    <div className='form-group'>
                        <input type="email" className='form-control' id='email' value={email} name="email" placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="password" className='form-control' id='password' value={password} name="password" placeholder='Enter your password' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input type="password" className='form-control' id='password2' value={password2} name="password2" placeholder='Confirm password' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Register</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;