import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const unClick = () => setClick(false);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <span>SD JWT</span>
          </NavLink>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink to="/#debugger" className="nav-links" onClick={unClick}>
                Debugger
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/library" className="nav-links" onClick={unClick}>
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
