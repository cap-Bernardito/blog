import React from "react";
import cn from "classnames";

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return <header className={cn(className)}></header>;
};
