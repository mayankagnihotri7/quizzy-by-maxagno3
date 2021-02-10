import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ name, path }) => {
  return (
    <Link
      to={path}
      className="inline-flex items-center px-1 pt-1 mr-3 font-semibold leading-5 text-indigo-500 hover:text-indigo-500"
    >
      {name}
    </Link>
  );
};

export default NavItem;
