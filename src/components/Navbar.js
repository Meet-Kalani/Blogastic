import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import searchIcon from "../imgs/search-icon.png";
import downArrow from "../imgs/down-arrow.png";
import logo from "../imgs/logo.png";

const Navbar = (props) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(true);
  const history = useHistory();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchBtn = () => {
    if (search !== "") {
      props.search(search);
      history.push("/Blogastic/blog/search");
    }
  };

  const toggler = () => {
    if(window.screen.width < 992){
      setToggle(!toggle)
    }

    if (window.screen.width > 992) {
      if(!toggle){
        setToggle(true);
      }
    }
  }

  return (
    <div id="navbar">
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to="/Blogastic/">
            <h2>Blogastic</h2>
          </Link>
        </div>
        <div className="searchBar">
          <input type="text" onChange={handleSearch} />
          <button>
            <img src={searchIcon} onClick={searchBtn} alt="search icon" />
          </button>
        </div>
        {props.name ? (
          <div style={{ textAlign: "right" }}>
            <p> Welcome, {props.name}!</p>
          </div>
        ) : (
          <div className="signupBtn">
            <Link to="/Blogastic/login">Login</Link>
            <Link to="/Blogastic/signup" className="btn">
              Sign up
            </Link>
          </div>
        )}
      </nav>
      {
        toggle && <div className="navbar">
        <div className="searchBar">
          <input type="text" onChange={handleSearch} />
          <button>
            <img src={searchIcon} onClick={searchBtn} alt="search icon" />
          </button>
        </div>
        <ul>
          <li>
            <Link to="/Blogastic/">Home</Link>
          </li>
          <li>
            <Link to="/Blogastic/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/Blogastic/profile">Profile</Link>
          </li>
          <li>
            <Link to="/Blogastic/login">Login / Signup</Link>
          </li>
          <li>
            <Link to="/Blogastic/contact">Contact</Link>
          </li>
        </ul>
      </div>
      }
      <div className="down-arrow-icon" onClick={toggler}>
        <img src={downArrow} alt="Down Arrow" />
      </div>
    </div>
  );
};

export default Navbar;
