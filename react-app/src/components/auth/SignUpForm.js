import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
// import { Button, Form } from "react-bootstrap";

const SignUpForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [pageNumber, setPageNumber] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [headline, setHeadline] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [imageLoading, setImageLoading] = useState(false)
  // setImageLoading(true)

  const onSignUp = async (e) => {

    const formData = new FormData()
    formData.append("password", password)
    formData.append("repeatPassword", repeatPassword)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("city", city)
    formData.append("state", state)
    formData.append("headline", headline)
    formData.append("avatar", avatar)

    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(formData));
    }; // formData instead of passing: firstName, lastName, city, state, headline, email, password, avatar
    history.push('/explore')
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

  const updateAvatar= (e) => {
    setAvatar(e.target.files[0]);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const nextPage = (e) => {
    setPageNumber(pageNumber+1)
  }

  return (
    <>
    <div className="sign-up-container">
      {pageNumber === 0 && (
        <form className="first-form-container">
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
          <button className='continue-button' onClick={nextPage}>Continue</button>
      </form>
      )}

      {pageNumber === 1 && (
          <form className="second-form-container">
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
          <button className='continue-button' onClick={nextPage}>Continue</button>
        </form>
      )}

      {pageNumber === 2 && (
         <form className="third-form-container">
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
         <button className='continue-button' onClick={nextPage}>Continue</button>
       </form>
      )}

      {pageNumber === 3 &&(
          <form className="fourth-form-container">
            <div className="upload-avatar-box">
              <label className="upload-label" htmlFor="file">Upload Profile <i class="fas fa-upload"></i></label>
                  <input
                  id = "file"
                  className="input-file"
                  name = "image"
                  type = "file"
                  onChange = {updateAvatar}
                  />
            </div>
            <button className='continue-button' onClick={nextPage}>Continue</button>
            {imageLoading && <div>Uploading...</div>}
        </form>

      )}
      {pageNumber === 4 &&(
        <div>
          <h4>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</h4>
          <button className="submit-button" onClick={onSignUp}>Agree & Join</button>
        </div>
      )}
        {/* <button type="submit">Agree & Join</button> */}

      </div>
    </>
  );
};

export default SignUpForm;
