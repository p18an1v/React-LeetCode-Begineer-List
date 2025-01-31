import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative group hover:text-[hsl(225.9,70.7%,60.2%)] transition-colors duration-300"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[hsl(225.9,70.7%,40.2%)] transition-all group-hover:w-full"></span>
    </Link>
  );
};

export default NavItem;