import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./Navigation.css";
import ProfileButton from "./ProfileDropDown";
import Search from "./Search.js"
import SearchResult from './SearchResult';

const Navigation = () => {
  const [search, setSearch] = useState("")
  return (
    <nav>
      <div className="nav-bar-container">
        <Search />
        <SearchResult search={search}/>
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
        <li>
        </li>
        <ProfileButton/>
      </div>
    </nav>
  );
}

export default Navigation;
