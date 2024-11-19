import React from 'react';
import { useNavigate } from 'react-router-dom';
import imageProfile from '../assets/person_13924070.png';

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); // Redireciona para a página inicial
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Redireciona para a página de perfil
  };

  const handleCreateBookClick = () => {
    navigate('/create-book'); // Redireciona para a página de criação de livro
  };

  return (
    <header style={headerStyle}>
      <button onClick={handleHomeClick} style={buttonStyle}>
        Home
      </button>
      <button onClick={handleCreateBookClick} style={buttonStyle}>
        Criar Livro
      </button>
      <div style={profileIconStyle} onClick={handleProfileClick}>
        <img src={imageProfile} alt="Profile Icon" style={iconStyle} />
      </div>
    </header>
  );
};

const headerStyle = {
  position: 'fixed', // Fixa o header no topo
  top: 0, // Posiciona no topo
  left: 0, // Alinha à esquerda
  width: '100%', // Ocupa a largura total
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  zIndex: 1000, // Garante que o header fique acima de outros elementos
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px', // Adiciona espaço entre os botões
};

const profileIconStyle = {
  cursor: 'pointer',
};

const iconStyle = {
  width: '30px',
  height: '30px',
  marginRight: '40px'
};

export default Header;
