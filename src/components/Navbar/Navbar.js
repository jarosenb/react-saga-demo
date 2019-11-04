import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./Navbar.css";

export function NavButton({ active, dest, title }) {
  let history = useHistory();

  if (active) {
    return (
      <button
        onClick={() => history.push(dest)}
        className="btn btn-primary btn-block"
      >
        {title}
      </button>
    );
  } else {
    return (
      <button
        onClick={() => history.push(dest)}
        className="btn btn-secondary btn-block"
      >
        {title}
      </button>
    );
  }
}

function Navbar() {
  let location = useLocation();

  return (
    <div>
      <NavButton
        active={location.pathname === "/all"}
        dest={"/all"}
        title={"All"}
      />
      <NavButton
        active={location.pathname === "/popular"}
        dest={"/popular"}
        title={"Popular"}
      />
      <NavButton
        active={location.pathname === "/aww"}
        dest={"/aww"}
        title={"Aww"}
      />
    </div>
  );
}

export default Navbar;
