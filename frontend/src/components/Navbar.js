import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  function isLoggedIn() {
    var requestOptions = {
      method: "GET",
      credentials: "include",
      redirect: "follow",
    };

    fetch("http://localhost:5000/protected-route", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
        if (result.message == "Login successful") {
          setLoggedIn(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    const userIsLoggedIn = isLoggedIn();
    setLoggedIn(userIsLoggedIn);
  }, []);

  const renderDropdown = () => {
    if (showDropdown) {
      return (
        <div className="news-dropdown-box">
          <ul className="news-dropdown">
            <li>
              <Link to="/article/Health">Health</Link>
            </li>
            <li>
              <Link to="/article/Fashion">Fashion</Link>
            </li>
            <li>
              <Link to="/article/Technology">Travel</Link>
            </li>
            <li>
              <Link to="/article/Food">Food</Link>
            </li>
            <li>
              <Link to="/article/Science">Science</Link>
            </li>
            <li>
              <Link to="/article/Finance">Finance</Link>
            </li>
            <li>
              <Link to="/article/politics">politics</Link>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="span">
        <Container>
          <span>NewsWave</span>
          <span className="span2">
            {loggedIn ? (
              <button className="comic-button">
                Logout
              </button>
            ) : (
              <button className="comic-button">
                <Link to="/userRegister" className="link-comic">
                  Login / Signup
                </Link>
              </button>
            )}
          </span>
        </Container>
      </div>

      <div className="navbar-main">
        <Container>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/article/Entertainment">Entertainment</Link>
            </li>
            <li>
              <Link to="/article/Education">Education</Link>
            </li>
            <li>
              <Link to="/article/Technology">Technology</Link>
            </li>
            <li>
              <Link to="/article/Sports">Sports</Link>
            </li>
            <li>
              <Link to="/article/LifeStyle">LifeStyle</Link>
            </li>
            <li>
              <Link to="/article/Gaming">Gaming</Link>
            </li>
            <li
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownToggle}
              className={`news-dropdown-trigger ${
                showDropdown ? "active" : ""
              }`}
            >
              Categories
              {renderDropdown()}
            </li>
            <li style={{ marginLeft: "290px" }}>
              <Link to="/get-saved-articles">Saved Items</Link>
            </li>
          </ul>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;
