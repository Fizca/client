import { useState } from "react";
import { observer } from "mobx-react";
import { Link, useHistory } from 'react-router-dom';
import { NavBar, NavItem, NavDropdown, DropdownItem } from '@components/NavBar';

import Store from '@models/Store';
import Modal from "@components/Modal";
import GalleryForm from "@containers/GalleryForm";
import MomentForm from "@containers/MomentForm";
import VitalsForm from "@containers/VitalsForm";

const Navigation = observer((props) => {
  const [ activeComponent, setActiveComponent ] = useState(null);

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
            <DropdownItem onClick={() => setActiveComponent(<MomentForm />)}>
              <i className="las la-book-medical"></i>Add A Moment
            </DropdownItem>
            <DropdownItem onClick={() => setActiveComponent(<VitalsForm />)}>
              <i className="las la-file-medical"></i>Add Vitals
            </DropdownItem>
            <DropdownItem onClick={() => setActiveComponent(<GalleryForm />)}>
              <i className="las la-file-upload"></i>Upload Images
            </DropdownItem>
            <DropdownItem onClick={logout}>
              <i className="las la-sign-out-alt"></i>Logout
            </DropdownItem>
        </NavDropdown>
      </NavBar>

      <Modal showModal={activeComponent} setShowModal={() => setActiveComponent(null)} backgroundClose>
        {activeComponent}
      </Modal>
    </header>
  );
});

export default Navigation;
