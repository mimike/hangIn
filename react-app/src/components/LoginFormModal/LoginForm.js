// import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch } from 'react-redux';
// import { useHistory} from 'react-router-dom';
// import './LoginForm.css';

// const LoginForm = () => {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.session.user);
//     const [errors, setErrors] = useState([]);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const onLogin = async (e) => {
//       e.preventDefault();
//       const data = await dispatch(login(email, password));
//       if (data.errors) {
//         setErrors(data.errors);
//       }
//     };

//     const updateEmail = (e) => {
//       setEmail(e.target.value);
//     };

//     const updatePassword = (e) => {
//       setPassword(e.target.value);
//     };

//     if (user) {
//       return <Redirect to="/" />;
//     }

//     return (
//       <form onSubmit={onLogin}>
//         <div>
//           {errors.map((error) => (
//             <div>{error}</div>
//           ))}
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             name="email"
//             type="text"
//             placeholder="Email"
//             value={email}
//             onChange={updateEmail}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={updatePassword}
//           />
//           <button type="submit">Login</button>
//           <button type="button" className="demo-log-in">
//             <DemoUser />
//           </button>


//         </div>
//       </form>
//     );
//   };

//   export default LoginForm;








//UNKO Login modal
//Render a form with a controlled input for the user login credential (username or email) and a controlled input for the user password.
// function LoginForm(){
//     const history = useHistory();
//     const dispatch = useDispatch();
//     //const sessionUser = useSelector(state => state.session.user);
//     const [credential, setCredential ] = useState("");
//     const [password, setPassword] = useState("");
//     const [errors, setErrors] = useState([]);
//     //If there is a current session user in the Redux store, then redirect the user to the "/" path if trying to access the LoginFormPage.
//     // if (sessionUser) return (
//     //     <Redirect to="/" />
//     // );

//     //On submit of the form, dispatch the login thunk action with the form input values. Make sure to handle and display errors from the login thunk action if there are any.
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setErrors([]);
//         return dispatch(sessionActions.login({ credential, password }))
//             .catch(async (res) => {
//                 const data = await res.json();
//                 if (data && data.errors) setErrors(data.errors)
//             });
//             history.push('/')
//     }
//     return (
//         <form onSubmit={handleSubmit}>
//             <ul>
//                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//             </ul>
//             <div className="login-title">
//               <h2><i class="fas fa-poop" style={{color:"pink"}}></i>    log in</h2>

//             </div>


//             <div className="login-form-container">
//               <div className="email-box">
//                   <input
//                       type="text"
//                       placeholder="Email Address"
//                       value={credential}
//                       onChange={(e) => setCredential(e.target.value)}
//                       required
//                   />
//               </div>

//               <div className="password-box">
//                   <input
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                   />
//               </div>
//             </div>
//             <label>
//                 <div className="login-modal-button">
//                   <button type="submit">Continue</button>
//                 </div>

//                 <div class="soc">
//                     <a href="https://www.facebook.com" class="fa fa-facebook"></a>
//                     <a href="https://twitter.com" class="fa fa-twitter"></a>
//                     <a href="https://linkedin.com" class="fa fa-linkedin"></a>
//                 </div>
//             </label>
//         </form>
//     );
// }


// export default LoginForm;
