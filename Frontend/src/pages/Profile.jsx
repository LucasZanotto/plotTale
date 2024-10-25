import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const Profile = () => {
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Obtendo o ID do autor do localStorage
    const authorId = localStorage.getItem("authorId");

    // Função para buscar as informações do autor
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/authors/${authorId}`);
        setAuthor(response.data);
      } catch (error) {
        console.error("Erro ao buscar o autor:", error);
      }
    };

    // Função para buscar os livros em que o autor contribuiu
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/authors/${authorId}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error("Erro ao buscar os livros do autor:", error);
      }
    };

    fetchAuthor();
    fetchBooks();
  }, []);

  if (!author) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <h1>Perfil do Autor</h1>
      <h2>{author.name}</h2>
      <p><strong>Email:</strong> {author.email}</p>
      <p><strong>About:</strong> {author.about || "Informação não disponível."}</p>

      <h3>Livros Contribuídos:</h3>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>O autor não contribuiu para nenhum livro ainda.</p>
      )}
    </div>
  );
};

export default Profile;
