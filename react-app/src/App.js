import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import SplashPage from "./components/SplashPage"
import NetworkPage from "./components/NetworkPage";
import Feed from "./components/Feed"
import ProfilePage from "./components/ProfilePage";
//import ProfileTile from "./components/NetworkPage/ProfileTile"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
// import UploadBox from "./components/UploadBox";
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

        <Switch>
        <Route path="/" exact={true}>
            <SplashPage />
        </Route>
        <Route path="/explore">
          <Navigation />
            <NetworkPage />
        </Route>

        <Route path="/feed">
          <Navigation />

          <Feed/>
        </Route>
        <Route path="/profile">
          <Navigation />
          <ProfilePage />
            {/* <ProfileTile/> */}
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path="/users" exact={true} >
          <Navigation />
          <UsersList/>
        </ProtectedRoute>

        <Route path="/user/:userId" exact={true} >
          <Navigation />
          <User />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
