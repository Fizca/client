import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import { CloudUploadFill, Bookmarks, PersonFill, BookmarkPlus, XSquare } from "react-bootstrap-icons";
import { Link, useHistory } from 'react-router-dom';

import Store from '@models/Store';

const NavBar = (props) => {
  const { children } = props;
  return (
    <nav>
      <ul className="navbar-nav">
        {children}
      </ul>
    </nav>
  );
}

const NavItem = (props) => {
  const { children, className, icon, to } = props;

  function link() {
    if (to && icon) {
      return (<Link className='nav-item icon-button' to={to}>{icon}</Link>)
    }
    return (<Link className='nav-item' to={to}>{children}</Link>)
  }

  return (
    <li className={`nav-item ${{...className}}`}>
      {link()}
    </li>
  );
}

const NavDropdown = (props) => {
  const { children, className, icon } = props;

  const [open, setOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(null);

  const buttonRef = useRef();
  const dropdownRef = useRef();

  /**
   * On open, add a event listener to the document to force the menu to close
   * when clicked outside of it.
   */
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    if (open) {
      const handler = (event) => {
        if (!dropdownRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) {
          setOpen(false)
          document.removeEventListener("mousedown", handler);
        }
      };
      document.addEventListener("mousedown", handler);
    }
  }, [open])

  function openDropdown() {
    return(
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
        <div className="menu">
          {children}
        </div>
      </div>
    );
  }

  return (
    <li className={`nav-item ${{...className}}`}>
      <button className="icon-button" ref={buttonRef} onClick={() => setOpen((!open))}>
        {icon}
      </button>
      { open && openDropdown()}
    </li>
  );
}

function DropdownItem(props) {
  const { onClick, leftIcon, rightIcon, children, to } = props;
  if (to) {
    <Link to="#" className="menu-item">
      <span className="icon-button">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </Link>
  }
  return (
    <div className="menu-item" onClick={onClick}>
      <span className="icon-button">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </div>
  );
}

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
        <NavItem to="/" className="logo">FIZCA</NavItem>
        <NavItem icon={<CloudUploadFill />} to="/uploads" />
        <NavItem icon={<Bookmarks />} to="/moments" />
        <NavItem icon={<BookmarkPlus />} to="/moments_add" />
        <NavDropdown icon={<div><img src={`${Store.user.avatar}`} /></div>}>
            <DropdownItem onClick={(() => logout())} leftIcon={<XSquare />}>
              Logout
            </DropdownItem>
        </NavDropdown>
      </NavBar>
    </header>
  );
});

export default Navigation;
