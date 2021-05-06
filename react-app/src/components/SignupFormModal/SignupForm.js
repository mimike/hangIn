// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import * as sessionActions from "../../store/session";
// import "./SignupForm.css"
// import { useHistory} from 'react-router-dom';
// import { Modal } from '../../context/Modal';
// import LoginForm from '../LoginFormModal/LoginForm';

// function SignupForm(){
//     const dispatch = useDispatch();
//     const [showModal, setShowModal] = useState(false);
//     const [ email, setEmail ] = useState("");
//     const [ firstName, setFirstName] = useState("");
//     const [ lastName, setLastName] = useState("");
//     const [ address, setAddress ] = useState("");
//     const [ city, setCity ] = useState("");
//     const [ state, setState ] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [errors, setErrors ] = useState([]);
//     //On submit of the form, validate that the confirm password is the same as the password fields, then dispatch the signup thunk action with the form input values. Make sure to handle and display errors from the signup thunk action if there are any.
//     const handleSubmit = (e) => {
//             setErrors([]);
//             return dispatch(sessionActions.signup({ email, username, firstName, lastName, city, state, password}))
//                 .catch(async (res) => {
//                     const data = await res.json();
//                     if (data && data.errors) setErrors(data.errors);
//                 });
//     }
//     //Render form with controlled inputs for the new user's username, email, and password, and confirm password fields.
//     return (
//         <form onSubmit={handleSubmit}>
//           <ul>
//             {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//           </ul>

//             <div className="logo">
//               <h1>HangIn</h1>
//             </div>

//             <div className="signup-title">
//                 <h2>join the world's largest aerialist network</h2>
//             </div>

//             <div className="sign-up-container">
//               <div className="email">
//                 <label>Email</label>
//                 <input
//                   type="text"
//                   placeholder="Email "
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="first-name">
//                 <label>Password (6 or more characters)</label>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="last-name">
//                 {/* Last Name */}
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="address">
//                 {/* Address */}
//                 <input
//                   type="text"
//                   value={address}
//                   placeholder="Address"
//                   onChange={(e) => setAddress(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="city">
//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="state">
//                 <input
//                   type="text"
//                   value={state}
//                   placeholder="State"
//                   onChange={(e) => setState(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="password">
//                 {/* Password */}
//                 <input
//                   type="password"
//                   placeholder="Create a Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="password">
//                 {/* Confirm Password */}
//                 <input
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="signup-submit-button">
//                 <button type="submit">Sign Up</button>
//               </div>

//               <div className="already-have-account">
//                 <h3>Already have an account?</h3>
//               </div>

//               <button className="login-link" style={{backgroundColor: "white"}}onClick={() => setShowModal(true)}>Log in</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <LoginForm />
//         </Modal>
//       )}
//     {/* </> */}

//               <div>

//           </div>




//           </div>


//         </form>
//       );

// }
// export default SignupForm;
