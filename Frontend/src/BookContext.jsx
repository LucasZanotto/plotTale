import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(['Livro 1', 'Livro 2', 'Livro 3']);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  );
};
