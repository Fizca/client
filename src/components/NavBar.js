import { useEffect, useRef, useState } from "react";

export const NavBar = (props) => {
  const { children } = props;
  return (
    <nav>
      <ul className="navbar-nav">
        {children}
      </ul>
    </nav>
  );
}

export const NavItem = (props) => {
  const { children, className } = props;
  return (
    <li className={`nav-item ${className}`}>
      {children}
    </li>
  );
}

export const NavDropdown = (props) => {
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
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef} onClick={() => setOpen(false)}>
        <div className="menu">
          {children}
        </div>
      </div>
    );
  }

  return (
    <li className={`nav-item ${className}`}>
      <button className="icon-button" ref={buttonRef} onClick={() => setOpen((!open))}>
        {icon}
      </button>
      { open && openDropdown()}
    </li>
  );
}

export const DropdownItem = (props) => {
  const { children, ...rest } = props;
  return (
    <div className="menu-item menu-btn" {...rest}>
      {children}
    </div>
  );
}
