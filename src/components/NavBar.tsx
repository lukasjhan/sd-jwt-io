import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const unClick = () => {
    window.scrollTo(0, 0);
    setClick(false);
  };
  const onClickDebug = () => {
    setClick(false);
    const element = document.getElementById('debugger');
    if (element) {
      const offset = 150; // Number of pixels you want to scroll above the element
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo" onClick={unClick}>
            <span>SD JWT</span>
          </NavLink>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink
                to="/#debugger"
                className="nav-links"
                onClick={onClickDebug}
              >
                Debugger
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="https://github.com/openwallet-foundation-labs/sd-jwt-js"
                target="_black"
                className="nav-links"
                onClick={unClick}
              >
                Library
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="https://www.ietf.org/archive/id/draft-ietf-oauth-selective-disclosure-jwt-06.html"
                target="_blank"
                className="nav-links"
                onClick={unClick}
              >
                About
              </NavLink>
            </li>
          </ul>
          <div
            style={{
              color: 'white',
            }}
          >
            <div
              className="nav-right"
              onClick={() => {
                window.open('https://hopae.com', '_blank');
              }}
              style={{
                cursor: 'pointer',
                paddingRight: '20px',
                fontSize: '1.3rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.6rem',
                }}
              >
                Crafted by{' '}
              </span>
              Hopae
            </div>
          </div>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <CloseOutlined style={{ fontSize: '32px' }} />
              </span>
            ) : (
              <span className="icon">
                <MenuOutlined style={{ fontSize: '32px' }} />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
