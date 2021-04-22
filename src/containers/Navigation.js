import { action, computed } from 'mobx';
import { observer } from "mobx-react";
import React from 'react'
import { Link } from 'react-router-dom';

import DarkLink from '@components/DarkLink';
import Store from '@models/Store';

@observer
class Navigation extends React.Component {
  @computed get user() {
    return Store.user;
  }

  @action
  logout() {
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fz-nav box-shadow mb-3">
          <DarkLink className="navbar-brand mr-auto" href="#">FIZCA</DarkLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/uploads">Uploads</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"
                   href="#"
                   id="dropdown01"
                   data-toggle="dropdown"
                   aria-haspopup="true"
                   aria-expanded="false">{this.user.name}</a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                  <button onClick={() => this.logout()} className="dropdown-item" type="button">Log Out</button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default Navigation;