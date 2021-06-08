import { observer } from "mobx-react";
import { Link, useHistory } from 'react-router-dom';
import { NavBar, NavItem, NavDropdown, DropdownItem } from '@components/NavBar';

import Store from '@models/Store';

const Navigation = observer((props) => {
  const history = useHistory();

  const logout = () => {
    Store.clearUser()
      .then(() => {
        console.log('Successful log out');
        history.push('/');
      });
  }

  if (!Store.user) {
    return null;
  }

  return (
    <header>
      <NavBar>
        <NavItem className="logo">
          <Link className='nav-item' to='/'>FIZCA</Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/moments"><i className="las la-book-open"></i></Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/vitals"><i className="las la-file-medical-alt"></i></Link>
        </NavItem>
        <NavDropdown icon={<div><img src={`${Store.user.avatar}`} /></div>}>
            <DropdownItem>
              <Link to="/moments_add"><i className="las la-book-medical"></i>Add Moment</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/vitals_add"><i className="las la-file-medical"></i>Add Vitals</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/uploads"><i className="las la-file-upload"></i>Upload Images</Link>
            </DropdownItem>
            <DropdownItem onClick={logout}>
              <i className="las la-sign-out-alt"></i>
              Logout
            </DropdownItem>
        </NavDropdown>
      </NavBar>
    </header>
  );
});

export default Navigation;
