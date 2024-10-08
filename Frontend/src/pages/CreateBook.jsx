import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../BookContext';

const CreateBook = () => {
  const [bookTitle, setBookTitle] = useState('');
  const { addBook } = useContext(BookContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(bookTitle);
    navigate('/');
  };

  return (
    <div>
      <h1>Criar Livro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título do Livro"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateBook;

/*

Book
{
Id
Title,
Author,
Content: [{id, authorId: "lucas", content: "era uma vez...", bookId: "1", Stage: "1", IsAprove?}],
Genre,
Is_Finish?
}
tipo se for o proprio author o Is_Finish sempre vai ser 1, se for um contributor que precisa de aprovação é 0

Author
{
Id
Name
Mail
Password
About
Book_Contributor: Aqui os livros que a pessoa contribui com contents
}

Content
{
Id,
Author_Id,
Content,
Book_Id,
Stage: qual o card certo,
Is_Aprove?
}

*/