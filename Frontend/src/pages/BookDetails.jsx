import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        setBook(response.data.book);
        setContents(response.data.contents);
      } catch (error) {
        console.error('Erro ao buscar detalhes do livro:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddContent = async () => {
    try {
      await axios.post(`/api/books/${id}/add-content`, {
        content: newContent,
      });
      setNewContent(''); // Limpar o campo de texto após submissão
      // Atualizar a lista de conteúdos
      const response = await axios.get(`/api/books/${id}`);
      setContents(response.data.contents);
    } catch (error) {
      console.error('Erro ao adicionar conteúdo:', error);
    }
  };

  if (!book) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="book-details">
      <Header />
      <h1>{book.title}</h1>
      <p>Gênero: {book.genre}</p>
      <p>Status: {book.is_finish ? 'Finalizado' : 'Em Progresso'}</p>

      <div className="content-list">
        {contents.map((content) => (
          <div key={content.id} className="content-card">
            <p>{content.content}</p>
            <small>Autor: {content.author_name}</small>
          </div>
        ))}
      </div>

      {!book.is_finish && (
        <div className="add-content">
          <h3>Adicionar Novo Conteúdo</h3>
          <textarea
            placeholder="Escreva o novo conteúdo aqui..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleAddContent}>Adicionar</button>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
