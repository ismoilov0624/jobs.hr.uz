import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./burger-menu.scss";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Menu right isOpen={isOpen} onStateChange={handleStateChange}>
      <Link onClick={closeMenu} className="menu-item" to="/">
        Bosh sahifa
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/about">
        Biz haqimizda
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/jobs">
        Bo'sh ish o'rinlari
      </Link>
      <Link onClick={closeMenu} className="menu-item" to="/companies">
        Tashkilotlar
      </Link>

      <div className="menu-auth">
        <Link onClick={closeMenu} className="burger-link" to="/signup">
          Ro'yxatdan o'tish
        </Link>
        <Link onClick={closeMenu} className="burger-link" to="/login">
          Kirish
        </Link>
      </div>
    </Menu>
  );
};

export default BurgerMenu;
