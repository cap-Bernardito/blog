import cn from "classnames";
import React from "react";

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return <div className={cn(className)}></div>;
};
