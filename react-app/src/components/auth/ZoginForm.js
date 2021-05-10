//delete later FORM bootstrap :(
import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <>
      <div className="log-in-container">
      <Form
      onSubmit={onLogin} className="log-in-form"
      >
			{/* {errors.length > 0 && <h2>{errors} </h2>} */}
			<Form.Group controlId="email-form">

				<Form.Control
					type="email"
          name="email"

					onChange={updateEmail}
					value={email}
					required
					placeholder="Email"
				/>
			</Form.Group>
			<Form.Group controlId="password-form">
				<Form.Control
					type="password"
          autoComplete="password"
					value={password}
					onChange={updatePassword}
					required
					placeholder="Password"
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Sign in
			</Button>
		</Form>
    {/* <Form>
      <Form.Group controlId="formBasicEmail" value={email}
          onChange={updateEmail}>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" value={password}
          onChange={updatePassword}>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit!
      </Button>
    </Form> */}

    {/* <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Sign in</button>
      </div>
    </form> */}
      </div>

    </>
  );
};

export default LoginForm;
