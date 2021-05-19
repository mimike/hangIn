import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { signUp, setUser } from '../../store/session';
//import {ListItem} from "react-native-elements"
import "./SignUpForm.css"
import "./LoginForm.css"
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
  const [cover, setCover] = useState(null);
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState("Fabric");
  const [experience, setExperience] = useState("");
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
    formData.append("about", about)
    formData.append("experience", experience)
    formData.append("state", state)
    formData.append("skills", skills)
    formData.append("headline", headline)
    formData.append("avatar", avatar) // the contents of avatar is request.files["avatar"]
    formData.append("cover", cover)

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

  const updateAbout = (e) => {
    setAbout(e.target.value);
  }
  const updateSkills = (e) => {
    setSkills(e.target.value);
  }

  const updateExperience= (e)=> {
    setExperience(e.target.value);
  }


  const updateHeadline= (e) => {
    setHeadline(e.target.value);
  };

  const updateAvatar= (e) => {
    setAvatar(e.target.files[0]);
  };

  const updateCover= (e) => {

    setCover(e.target.files[0]);
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

  const states=[
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]

  const skillz = ['Fabric', 'Hoop', "Rope", "Static trapeze"]

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
                  required
                  type="text"
                  name="email"
                  onChange={updateEmail}
                  value={email}
                ></input>
            </div>

            <div>
              <label>Password (6 or more characters)</label>
              <input
              required
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>

            <div>
              <label>Repeat Password</label>
              <input
              required
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            {!edit &&<button className='continue-button' onClick={nextPage}>Continue</button>}

            {/* {edit && <button className='back-button' onClick={prevPage}>Back</button>} */}
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
                placeholder=""
                onChange={updateHeadline}
                value={headline}
              ></input>
            </div>

            <div className="about-box">
              <label>About</label>
              <input
                type="textarea"
                name="about"
                placeholder=""
                onChange={updateAbout}
                value={about}
              ></input>
            </div>

            <div className="experience-box">
              <label>Experience</label>
              <input
                type="textarea"
                name="experience"
                placeholder=""
                onChange={updateExperience}
                value={experience}
              ></input>
            </div>

            <div>
            <label>Main Discipline</label>
            <select className='skills-dropdown' value={skills} onChange={(e) => setSkills(e.target.value)}>
                  <option value={0} disabled>Select Skills</option>
                  {skillz.map(skill => (
                    <option type="text" value={skill} key={skill}>{skill}</option>
                  ))}
              </select>
          </div>


            <button className='continue-button' onClick={nextPage}>Continue</button>
            {!edit && <button className='back-button' onClick={prevPage}>Back</button>}
          </form>
        )}

        {pageNumber === 2 && (
          <form className="third-form-container">
          <h1>Where are you based?</h1>
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
            <select className='state-dropdown' value={state} onChange={updateState}>
                  <option value={0} disabled>Select State</option>
                  {states.map(state => (
                    <option type="text" value={state} key={state}>{state}</option>
                  ))}
              </select>
          </div>

          <button className='continue-button' onClick={nextPage}>Continue</button>
          {!edit && <button className='back-button' onClick={prevPage}>Back</button>}
        </form>
        )}

        {pageNumber === 3 &&(
            <form className="fourth-form-container">
              <h1>Add a Photo</h1>
              <div className="upload-avatar-box">
                <label className="upload-profile-label" htmlFor="file">Upload Profile Photo<i class="fas fa-upload"></i></label>
                    <input
                    id = "file"
                    className="input-file"
                    name = "image"
                    type = "file"
                    onChange = {updateAvatar}
                    />
              </div>

              <div className="upload-avatar-box">
                <label className="upload-cover-label" htmlFor="file1">Upload Cover Photo <i class="fas fa-upload"></i></label>
                    <input
                    id = "file1"
                    className="input-file"
                    name = "image1"
                    type = "file"
                    onChange = {updateCover}
                    />
              </div>
              <button className='continue-button' onClick={nextPage}>Continue</button>
              {imageLoading && <div>Uploading...</div>}
              {edit && <button className='back-button' onClick={prevPage}>Back</button>}
          </form>

        )}
        {pageNumber === 4 &&(
          <div className='validate_form'>
            <h3>Please check if this information is correct</h3>
             <h5>
                First name: {firstName}
                </h5>
              <h5>
              Last name: {lastName}
              </h5>
              <h5>
              City: {city}
              </h5>
              <h5>
              State: {state}
              </h5>

              <h5>
              Headline: {headline}
              </h5>

              <h5>
              Email: {email}
              </h5>

              <h5>
              About: {about}
              </h5>

              <h5>
                Experience: {experience}
              </h5>
              <h5>
                Main Discipline: {skills}
                </h5>

              {/* <input
              value = {cover}
              /> */}
            <button className="back-it-up" onClick={() => setPageNumber(0)}>Start Over Update</button>
            <h4>By clicking Agree & Join, you agree to the HangIn User Agreement, Privacy Policy, and Cookie Policy.</h4>
            <button className="submit-button" onClick={onSignUp}>Agree & Join</button>
          </div>
        )}

        </div>
      </div>
    </>
  );
};

export default SignUpForm;
