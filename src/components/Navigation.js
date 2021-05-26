import { observer } from "mobx-react";
import { CloudUploadFill, Bookmarks, BookmarkPlus, XSquare, Heart, BookmarkHeart } from "react-bootstrap-icons";
import { Link, useHistory } from 'react-router-dom';
import { NavBar, NavItem, NavDropdown, DropdownButton } from '@components/NavBar';

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

  return (
    <header>
      <NavBar>
        <NavItem className="logo">
          <Link className='nav-item' to='/'>FIZCA</Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/uploads"><CloudUploadFill /></Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/moments"><Bookmarks /></Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/moments_add"><BookmarkPlus /></Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/vitals"><BookmarkHeart /></Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/vitals_add"><Heart /></Link>
        </NavItem>
        <NavDropdown icon={<div><img src={`${Store.user.avatar}`} /></div>}>
            <DropdownButton onClick={logout}>
              <i class="las la-sign-out-alt"></i>
              Logout
            </DropdownButton>
        </NavDropdown>
      </NavBar>
    </header>
  );
});

export default Navigation;
