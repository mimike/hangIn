import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
// import { Button, Form } from "react-bootstrap";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [headline, setHeadline] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(firstName, lastName, email, password));
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName= (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName= (e) => {
    setLastName(e.target.value);
  };

  const updateCity= (e) => {
    setCity(e.target.value);
  };

  const updateState= (e) => {
    setState(e.target.value);
  };

  const updateHeadline= (e) => {
    setHeadline(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
      <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password (6 or more characters)</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>First name</label>
        <input
        type="text"
        name="firstname"
        onChange={updateFirstName}
        value={firstName}
        >
        </input>
      </div>

      <div>
      <label>Last name</label>
        <input
          type="text"
          name="lastname"
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Headline</label>
        <input
          type="text"
          name="headline"
          onChange={updateHeadline}
          value={headline}
        ></input>
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          onChange={updateCity}
          value={city}
        ></input>
      </div>

      <div>
        <label>State</label>
        <input
          type="text"
          name="state"
          onChange={updateState}
          value={state}
        ></input>
      </div>


      <div>
        <h4>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</h4>
      </div>

      <button type="submit">Agree & Join</button>

    </form>
  );
};

export default SignUpForm;
