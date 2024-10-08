import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BookContext } from '../BookContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { books } = useContext(BookContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredBooks(books.filter(book => book.toLowerCase().includes(query)));
  };

  const handleBookClick = (book) => {
    navigate(`/book/${book}`);
  };

  return (
    <div className="home-container">
      <header className="header">
        <Link to="/login">
          <FaUserCircle size={32} className="account-icon" />
        </Link>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar livros..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="filters">
        <button>Ação</button>
        <button>Fantasia</button>
        <button>Romance</button>
      </div>
      
      <div className="create-book-button">
        <button onClick={() => navigate('/create-book')}>Criar Livro</button>
      </div>

      <div className="books-container">
        {filteredBooks.map((book, index) => (
          <div
            className="book-card"
            key={index}
            onClick={() => handleBookClick(book)}
          >
            <h3>{book}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
