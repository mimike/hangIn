import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./Navigation.css";
import ProfileButton from "./ProfileDropDown";

const Navigation = () => {

  return (
    <nav>
      <div className="nav-bar-container">
        {/* <Search /> */}
        <li>
          <a>
            <i class="fab fa-linkedin" ></i>
          </a>
          </li>

          {/* <button className="search-btn" type="button">
            <li-icon  type="search-icon" className="search-icon"><i class="fas fa-search"></i> </li-icon>
            <div className="searching"> Search</div>
          </button> */}
          <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>

        <input
            type="text"
            id="header-search"
            placeholder="Search"
            name="s"
        />
        {/* <button type="submit">Search</button> */}
    </form>
          <li>
          <li>
            <i class="fas fa-home"></i>
            <NavLink to="/feed" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
        </li>

        <li>
          <i class="fas fa-users"></i>
          <NavLink to="/explore" exact={true} activeClassName="active">
            My Network
          </NavLink>
        </li>

        <li>
          <i class="fas fa-briefcase"></i>
          <NavLink to="/feed" exact={true} activeClassName="active">
            Feed
          </NavLink>
        </li>
        {/* <li>
          <i class="fas fa-users"></i>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li> */}

        {/* <li>
          <i class="fas fa-users"></i>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}

        <li>

        </li>
        <ProfileButton/>
      </div>
    </nav>
  );
}

export default Navigation;


// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// //import BathroomTile from '../BathroomPage/BathroomTile';
// import SearchBar from '../SearchBar';
// import './Navigation.css';
// import { useHistory, Link } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
// import NewBathroomModal from '../NewBathroomModal';

// function Navigation({ isLoaded }){  //isLoaded ?
//   let dispatch = useDispatch();
//   const history = useHistory();
//   // const [ keyword, setKeyword ] = useState();
//   const sessionUser = useSelector(state => state.session.user); //?
//   const handleClick = () => {
//     dispatch(sessionActions.demoLogin())

//   }
//   //if there's a login user than profile button will render
//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <ProfileButton user={sessionUser} />
//     );


//   } else {
//     sessionLinks = (   // not sure if this is right. the modal sign up doesn't work.
//       <>
//         <div className="navigation-button-container">
//           <div className="signup-button">
//             <SignupFormModal />
//           </div>
//           <div className="login-button">
//             <LoginFormModal />
//           </div>

//           <div className="share-bathroom-button">
//             <NewBathroomModal />
//           </div>


//           <div>
//             <Link to="/" onClick={handleClick} style={{textDecoration:"none", fontSize:"medium", marginLeft: "10px"}}>Demo</Link>
//           </div>
//         </div>

//       </>
//     );
//   }

// //bathroomsInCity.map((bathroom) =>  <BathroomTile bathroom={bathroom} key={bathroom.id}/>)
//   return (   //search bar icon?!
//     <>
//       <div>
//         <SearchBar />
//       </div>
//       <ul>
//           <div>
//             <h1 > <a href="/" style={{textDecoration:"none", color:"black"}}><i class="fas fa-poop" style={{color:"pink", marginRight:"10px"}}></i>unkobnb</a></h1>
//           </div>
//                 {/* {isLoaded} */}
//                 {sessionLinks}

//       </ul>
//       <div className="button-container">


//           <div>
//             <button className="nav-button" style={{color:"blue", fontSize:"medium", fontWeight:"bold"}}type="button" onClick={() => history.push('/best')}>Discover</button>
//           </div>

//           <div>
//             <button className="nav-button" style={{color:"green", fontSize:"medium", fontWeight:"bold"}} type="button" onClick={() => history.push('/new')}>Share</button>
//           </div>


//         </div>
//     </>
//   );
// }
// export default Navigation;
