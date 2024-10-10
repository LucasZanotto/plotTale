// src/components/BookCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Home.css";

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navega para a página de detalhes do livro
        navigate(`/books/${book.id}`);
    };

    return (
        <div className="book-card" onClick={handleClick}>
            <h3>{book.title}</h3>
            <p>{book.genre}</p>
            <p>{book.is_finish ? 'Finalizado' : 'Em andamento'}</p>
        </div>
    );
};

export default BookCard;
