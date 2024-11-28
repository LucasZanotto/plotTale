import React from "react";
import { useNavigate } from "react-router-dom";
import imageProfile from "../assets/person_13924070.png";
import './Header.css'; 

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return localStorage.getItem("authorId") !== null;
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    if (isAuthenticated()) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleCreateBookClick = () => {
    if (isAuthenticated()) {
      navigate("/create-book");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <button onClick={handleHomeClick} className="button">
        Home
      </button>
      <button onClick={handleCreateBookClick} className="button">
        Criar Livro
      </button>
      <div className="profile-icon" onClick={handleProfileClick}>
        <img src={imageProfile} alt="Profile Icon" className="icon" />
      </div>
    </header>
  );
};

export default Header;
