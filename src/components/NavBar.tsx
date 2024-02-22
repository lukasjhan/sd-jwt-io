import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const unClick = () => {
    window.scrollTo(0, 0);
    setClick(false);
  };
  const onClickDebug = () => {
    setClick(false);
    const element = document.getElementById("debugger");
    if (element) {
      const offset = 150; // Number of pixels you want to scroll above the element
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <NavLink to="/" className={styles.navLogo} onClick={unClick}>
            <span>SD JWT</span>
          </NavLink>

          <ul className={click ? styles.navMenuActive : styles.navMenu}>
            <li className={styles.navItem}>
              <NavLink
                to="/#debugger"
                className={styles.navLinks}
                onClick={onClickDebug}
              >
                Debugger
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="https://github.com/openwallet-foundation-labs/sd-jwt-js"
                target="_black"
                className={styles.navLinks}
                onClick={unClick}
              >
                Library
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="https://www.ietf.org/archive/id/draft-ietf-oauth-selective-disclosure-jwt-06.html"
                target="_blank"
                className={styles.navLinks}
                onClick={unClick}
              >
                About
              </NavLink>
            </li>
          </ul>
          <div
            style={{
              color: "white",
            }}
          >
            <div
              className={styles.navRight}
              onClick={() => {
                window.open("https://hopae.com", "_blank");
              }}
              style={{
                cursor: "pointer",
                paddingRight: "20px",
                fontSize: "1.3rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.6rem",
                }}
              >
                Crafted by{" "}
              </span>
              Hopae
            </div>
          </div>
          <div className={styles.navIcon} onClick={handleClick}>
            {click ? (
              <span className={styles.icon}>
                <CloseOutlined style={{ fontSize: "32px" }} />
              </span>
            ) : (
              <span className={styles.icon}>
                <MenuOutlined style={{ fontSize: "32px" }} />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
