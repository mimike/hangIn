import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import './UploadModal.css';

const UploadModal = () => {


    const onLogin = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    };

    const updateEmail = (e) => {
      setEmail(e.target.value);
    };

    const updatePassword = (e) => {
      setPassword(e.target.value);
    };

    if (user) {
      return <Redirect to="/feed" />;
    }

    return (
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button type="submit">Login</button>
          <button type="button" className="demo-log-in">
            <DemoUser />
          </button>


        </div>
      </form>
    );
  };

  export default UploadModal;
