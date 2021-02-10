import React from "react";
import NavItem from "./NavItem";

const NavBar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex text-3xl">
              <NavItem name="Quizzy" path="/" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <NavItem name="Login" path="/login" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
