import React from "react";
import cn from "classnames";

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return <div className={cn(className)}></div>;
};
