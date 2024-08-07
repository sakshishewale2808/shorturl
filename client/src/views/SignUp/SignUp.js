import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import "./../../index.css";

function Signup() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: ''
  });

  const signup = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      dob: user.dob
    });
    if (response.data.success) {
      toast.success(response.data.message);
      setUser({
        fullName: '',
        email: '',
        password: '',
        dob: ''
      });
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="main-container-parent">
      <div className="h1-div">
        <h1 className='auth-heading'>User Registration</h1>
      </div>
      <form className='form auth-form'>
        <input
          type='text'
          placeholder='Full Name'
          className='input-fields'
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        />
        <input
          type='email'
          placeholder='E-mail'
          className='input-fields'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          className='input-fields'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          type='date'
          placeholder='Date of Birth'
          className='input-fields'
          value={user.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
        />
        <button type='button' className='btn' onClick={signup}>Register</button>
      </form>
      <Link to='/login' className='login-link'>Already Have an Account? Login</Link>
      <Toaster />
    </div>
  );
}

export default Signup;
