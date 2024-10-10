import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [contributedBooks, setContributedBooks] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data.user);
        setContributedBooks(response.data.contributedBooks);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="profile">
      <h1>Perfil de {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Sobre: {user.about || 'Nada informado'}</p>

      <h2>Livros Contribuídos</h2>
      <ul>
        {contributedBooks.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Gênero: {book.genre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
