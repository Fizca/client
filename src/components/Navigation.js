import { useState } from "react";
import { observer } from "mobx-react";
import { Link, useHistory } from 'react-router-dom';
import { NavBar, NavItem, NavDropdown, DropdownItem } from '@components/NavBar';

import Store from '@models/Store';
import Modal from "@components/Modal";
import GalleryForm from "@containers/GalleryForm";
import MomentForm from "@containers/MomentForm";
import VitalsForm from "@containers/VitalsForm";

import ff_standing from "../../public/ff_standing.svg"
import ff_seating from "../../public/ff_seating.svg"
import styled from "styled-components";

const NavLogo = styled.div`
  height: var(--nav-size);
  width: var(--nav-size);
  background-image: url("${ff_seating}");
  background-size: contain;
  transition: all 300ms ease-in-out;

  &:hover {
    background-image: url("${ff_standing}");
  }
`;

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

  const navByRole = () => {
    if (!Store.user.canContribute()) {
      return null;
    }

    return (
      <>
        <DropdownItem onClick={() => setActiveComponent(<MomentForm close={() => setActiveComponent(null)}/>)}>
          <i className="las la-book-medical"></i>Add A Moment
        </DropdownItem>
        {/* <DropdownItem onClick={() => setActiveComponent(<VitalsForm />)}>
          <i className="las la-file-medical"></i>Add Vitals
        </DropdownItem> */}
        <DropdownItem onClick={() => setActiveComponent(<GalleryForm />)}>
          <i className="las la-file-upload"></i>Upload Images
        </DropdownItem>
      </>
    );
  }

  if (!Store.user) {
    return null;
  }

  return (
    <header>
      <NavBar>
        <NavItem className="logo">
          <Link className='nav-item' to='/'><NavLogo /></Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/"><i className="las la-book-open"></i></Link>
        </NavItem>
        <NavItem>
          <Link className='nav-item icon-button' to="/gallery"><i className="las la-images"></i></Link>
        </NavItem>
        {/* <NavItem>
          <Link className='nav-item icon-button' to="/vitals"><i className="las la-file-medical-alt"></i></Link>
        </NavItem> */}
        <NavDropdown icon={<div><img src={`${Store.user.avatar}`} /></div>}>
            {navByRole()}
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
