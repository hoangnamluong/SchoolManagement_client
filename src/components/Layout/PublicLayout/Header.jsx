import { Link, Outlet } from "react-router-dom";
import "./header.scss";
import { useEffect, useState } from "react";

const navbarItemList = ["Home", "Enrollment", "News", "About", "Login"];

const Header = () => {
  useEffect(() => {
    const handleScroll = (e) => {
      const btn = document.getElementById("btn-on-scroll");

      if (window.scrollY >= 500) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarItemRender = navbarItemList.map((item) => (
    <li key={item}>
      {item === "Home" ? (
        <Link to={"/"}>{item}</Link>
      ) : (
        <Link to={`/${item.toLowerCase()}`}>{item}</Link>
      )}
    </li>
  ));

  return (
    <>
      <nav>
        <h2>Brand</h2>
        <ul>
          {navbarItemRender}
          <button className="secondary-btn">
            <Link to="/signup">GET STARTED</Link>
          </button>
        </ul>
      </nav>

      <button className="secondary-btn btn-on-scroll" id="btn-on-scroll">
        <Link to="/signup">GET STARTED</Link>
      </button>

      <Outlet />
    </>
  );
};
export default Header;
