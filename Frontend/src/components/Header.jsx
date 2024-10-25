import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); // Redireciona para a página inicial
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Redireciona para a página de perfil
  };

  return (
    <header style={headerStyle}>
      <button onClick={handleHomeClick} style={buttonStyle}>
        Home
      </button>
      <div style={profileIconStyle} onClick={handleProfileClick}>
        <img src="/path/to/profile-icon.png" alt="Profile Icon" style={iconStyle} />
      </div>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const profileIconStyle = {
  cursor: 'pointer',
};

const iconStyle = {
  width: '30px',
  height: '30px',
};

export default Header;
