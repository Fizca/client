import React from 'react'
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import styled from 'styled-components';
import { action, computed } from 'mobx';
import { PersonCircle } from 'react-bootstrap-icons';
import conveeImg from '@public/logo512.png';

const AppTitle = styled.h1`
    color: purple;
    text-align: center;
`;

const WelcomeText = styled.p`
    font-size: 1.5em;
    color: purple;
    text-align: center;
`;

const NavBarImg = styled.img`
  height: 30px;
`;

@observer
class Navigation extends React.Component {
  @computed get user() {
    return {
      name: 'Name'
    };
  }

  @action
  logout() {
  }

  render() {
    return (
      <nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light shadow">
        <a className="navbar-brand" href="#"><NavBarImg src={conveeImg} alt="FIZCA" />FIZCA</a>
        <button className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/success" className="nav-link">Link</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <span><PersonCircle /> {this.user.name} </span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/profile" className="dropdown-item">Profile/Settings</Link>
                <div className="dropdown-divider"></div>
                <button onClick={() => this.logout()} className="dropdown-item" type="button">Log Out</button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navigation;