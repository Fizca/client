import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

interface NavBarProps {
  children?: ReactNode;
}

export const NavBar = (props: NavBarProps) => {
  const { children } = props;
  return (
    <nav>
      <ul className="navbar-nav">
        {children}
      </ul>
    </nav>
  );
}

interface NavItemProps {
  children?: ReactNode;
  className?: string;
}

export const NavItem = (props: NavItemProps) => {
  const { children, className } = props;
  return (
    <li className={`nav-item ${className}`}>
      {children}
    </li>
  );
}

interface NavDropdownProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const NavDropdown = (props: NavDropdownProps) => {
  const { children, className, icon } = props;

  const [open, setOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState<number | undefined>(undefined);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * On open, add a event listener to the document to force the menu to close
   * when clicked outside of it.
   */
  useEffect(() => {
    setMenuHeight((dropdownRef.current?.firstChild as HTMLElement | undefined)?.offsetHeight)
    if (open) {
      const handler = (event: MouseEvent) => {
        const target = event.target as Node;
        if (!dropdownRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
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

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const DropdownItem = (props: DropdownItemProps) => {
  const { children, ...rest } = props;
  return (
    <div className="menu-item menu-btn" {...rest}>
      {children}
    </div>
  );
}
