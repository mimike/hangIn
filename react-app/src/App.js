import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import SplashPage from "./components/SplashPage"
import NetworkPage from "./components/NetworkPage";
import Feed from "./components/Feed"
import UploadText from "./components/UploadFormModal/UploadText"
import Follows from "./components/Follows"

import ProfilePage from "./components/ProfilePage";
//import ProfileTile from "./components/NetworkPage/ProfileTile"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SideBar from "./components/SideBar"
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
// import UploadBox from "./components/UploadBox";
import Navigation from "./components/Navigation/index.js"
import "./index.css"


function App() {
  const history = useHistory();
  let user = useSelector(state => state.users);
  if (!user){
    history.push("/")
  }
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
        <Route path="/network">
          <Navigation />
            <NetworkPage />
        </Route>
        <Route path="/story">
          <UploadText />
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

        <Route path="/connections/:userId">
        <Navigation />
          <Follows />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
