import React from 'react';
import { useParams } from 'react-router-dom';
import './Book.css';

const Book = () => {
  const { bookTitle } = useParams();

  return (
    <div className="book-details-container">
      <h1>{bookTitle}</h1>
      <p>Este é o conteúdo detalhado do livro {bookTitle}.</p>
    </div>
  );
};

export default Book;
