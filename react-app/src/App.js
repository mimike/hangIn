import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import SplashPage from "./components/SplashPage"
import NetworkPage from "./components/NetworkPage";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import UploadPage from "./components/UploadPage";
import Navigation from "./components/Navigation/index.js"

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
      <Route path="/home" exact={true}>
          <SplashPage />
      </Route>
      <Route path="/explore">
            <NetworkPage />
            <UploadPage/>
        </Route>

        <Route path="/profile">
            <ProfilePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>





      </Switch>
    </BrowserRouter>
  );
}

export default App;
