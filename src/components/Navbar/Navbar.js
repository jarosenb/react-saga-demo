import React from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import "./Navbar.css";

// Memoize this component to prevent unneccessary re-renders
// We can do this because it always renders the same result given the same props
// https://reactjs.org/docs/react-api.html#reactmemo
export const NavButton = React.memo( ({ active, dest, title }) => {
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
})

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
      <NavButton
        active={location.pathname === "/asdfasdfasdf"}
        dest={"/asdfasdfasdf"}
        title={"Not a real page"}
      />
    </div>
  );
}

export default Navbar;
