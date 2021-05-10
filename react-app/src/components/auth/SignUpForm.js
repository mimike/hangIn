import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css"
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
  const [state, setState] = useState("AL");
  const [headline, setHeadline] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [imageLoading, setImageLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  // setImageLoading(true)

  const onSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    let response;
    formData.append("password", password)
    formData.append("repeatPassword", repeatPassword)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("city", city)
    formData.append("state", state)
    formData.append("headline", headline)
    formData.append("avatar", avatar)


    if (password === repeatPassword) {

      response = await dispatch(signUp(formData));
    }; // formData instead of passing: firstName, lastName, city, state, headline, email, password, avatar
    if(response.ok){
      history.push('/explore')

    } else {
      alert("HEY not good")
    }
  };

  if (user !== null) {
    return <Redirect to="/" />;
  }

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
    return <Redirect to="/feed"/>;
  }

  const nextPage = (e) => {
    setPageNumber(pageNumber+1)
  }
  const prevPage = (e) => {
    setPageNumber(pageNumber-1)
  }

  const states=['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']


  return (
    <>
    <div className="sign-up-container">
      <div className="sign-up-form">
        {pageNumber === 0 && (
          <form className="first-form-container">
            <h1>Make the most of your community</h1>
            <div>
              <label>Email</label>
                <input
                  type="text"
                  name="email"
                  // placeholder="Email"
                  onChange={updateEmail}
                  value={email}
                ></input>
            </div>

            <div>
              <label>Password (6 or more characters)</label>
              <input
                // placeholder="Password (6 or more characters)"
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
                // placeholder="Repeat Password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            {!edit &&<button className='continue-button' onClick={nextPage}>Continue</button>}

            {edit && <button className='continue-btn first-continue' onClick={() => setPageNumber(4)}>Update</button>}
        </form>

        )}

        {pageNumber === 1 && (
            <form className="second-form-container">
            <div>
              <h1>Make the most of your community</h1>

              <label>First name</label>
              <input
              type="text"
              name="firstname"
              // placeholder="First name"
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
                  // placeholder="Last name"
                  onChange={updateLastName}
                  value={lastName}
                ></input>
            </div>
            <div>
              <label>Headline</label>
              <input
                type="text"
                name="headline"
                // placeholder="Headline"
                onChange={updateHeadline}
                value={headline}
              ></input>
            </div>
            <button className='continue-button' onClick={nextPage}>Continue</button>
            {edit && <button className='continue-btn first-continue' onClick={() => setPageNumber(4)}>Update</button>}
          </form>
        )}

        {pageNumber === 2 && (
          <form className="third-form-container">
          <h1>Your profile helps you find new opportunities</h1>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              //  placeholder="City"
              onChange={updateCity}
              value={city}
            ></input>
          </div>

          <div>
            <label>State</label>
            <select className='state-dropdown' value={state} onChange={(e) => setState(e.target.value)}>
                  <option value={0} disabled>Select State</option>
                  {states.map(state => (
                    <option type="text" value={state} key={state}>{state}</option>
                  ))}
              </select>
          </div>

          <button className='continue-button' onClick={nextPage}>Continue</button>
          {edit && <button className='continue-btn first-continue' onClick={() => setPageNumber(4)}>Update</button>}
        </form>
        )}

        {pageNumber === 3 &&(
            <form className="fourth-form-container">
              <h1>Add a Photo</h1>
              <div className="upload-avatar-box">
                <label className="upload-label" htmlFor="file">Upload Profile Profile <i class="fas fa-upload"></i></label>
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
              {edit && <button className='continue-btn first-continue' onClick={() => setPageNumber(4)}>Update</button>}
          </form>

        )}
        {pageNumber === 4 &&(
          <div>
            <h4>Is this info correct?!</h4>
             <input
                value = {firstName}
                    />
              <input
              value = {lastName}
              />
              <input
              value = {city}
              />
              <input
              value = {state}
              /><input
              value = {headline}
              />
              <input
              value = {avatar}
              />
            <button className="back-it-up" onClick={() => setPageNumber(0)}>Start over Update</button>
            <h4>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</h4>
            <button className="submit-button" onClick={onSignUp}>Agree & Join</button>
          </div>
        )}

        </div>
      </div>
    </>
  );
};

export default SignUpForm;
