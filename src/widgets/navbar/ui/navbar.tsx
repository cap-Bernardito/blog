import cn from "classnames";
import React from "react";

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return <header className={cn(className)}></header>;
};
