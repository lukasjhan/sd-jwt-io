import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const unClick = () => {
    window.scrollTo(0, 0);
    setClick(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <NavLink to="/" className={`${styles.navLogo} monospace`} onClick={unClick}>
            <span>SD-JWT Debugger</span>
          </NavLink>

          <ul className={click ? styles.navMenuActive : styles.navMenu}>
            <li className={styles.navItem}>
              <NavLink to="/decode" className={styles.navLinks} onClick={unClick}>
                Decode
              </NavLink>
              <NavLink to="/issue" className={styles.navLinks} onClick={unClick}>
                Issue
              </NavLink>
              <NavLink to="/present" className={styles.navLinks} onClick={unClick}>
                Present
              </NavLink>
              <NavLink
                to="https://github.com/openwallet-foundation-labs/sd-jwt-js"
                target="_blank"
                className={styles.navLinks}
                onClick={unClick}
              >
                Library
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="https://sdjwt.js.org" target="_blank" className={styles.navLinks} onClick={unClick}>
                About
              </NavLink>
            </li>
          </ul>
          <div
            style={{
              color: 'white',
            }}
          >
            <NavLink
              className={styles.navRight}
              to="https://www.hopae.com"
              target="_blank"
              style={{
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                paddingRight: '20px',
                fontSize: '1.3rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.8rem',
                  textAlign: 'right',
                  marginRight: '8px',
                }}
              >
                Provided by <br /> HOPAE
              </span>
              <img
                width={48}
                src="https://assets-global.website-files.com/659d4e4a95e8dd9e35afd25a/659e06d136cc0d20099e75ac_app%20icon.png"
                alt="hopae logo"
              />
            </NavLink>
          </div>
          <div className={styles.navIcon} onClick={handleClick}>
            {click ? (
              <span className={styles.icon}>
                <CloseOutlined style={{ fontSize: '32px' }} />
              </span>
            ) : (
              <span className={styles.icon}>
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
