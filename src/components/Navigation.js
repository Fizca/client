import { observer } from "mobx-react";
import { Link, useHistory } from 'react-router-dom';

import DarkLink from '@components/DarkLink';
import Store from '@models/Store';

const Navigation = observer((props) => {
  const history = useHistory();

  const logout = () => {
    Store.clearUser().then(() => {
      console.log('Successful log out');
      history.push('/');
    });
  }

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
            <li className="nav-item">
              <Link className="nav-link" to="/moments">Moments</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/moments_add">Add Moment</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdown01"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">{Store.user.name}</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                <button onClick={logout} className="dropdown-item" type="button">Log Out</button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
});

export default Navigation;
