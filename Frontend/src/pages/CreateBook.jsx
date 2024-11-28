import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./CreateBook.css";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorId = localStorage.getItem("authorId");

    if (!authorId) {
      alert("Erro: Autor não identificado.");
      return;
    }

    try {
      console.log("info do livro: ", title, genre, authorId);
      await axios.post("http://localhost:8000/api/books", {
        title,
        genre,
        user_id: authorId,
      });

      alert("Livro criado com sucesso!");
      setTitle("");
      setGenre("");
      setError(null);

      navigate("/");
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      setError("Ocorreu um erro ao tentar criar o livro. Tente novamente.");
    }
  };

  return (
    <div>
      <Header />
      <div className="create-book-container">
        <h1 className="create-book-title">Criar Novo Livro</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="create-book-form">
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Gênero:</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              <option value="">Selecione um gênero</option>
              <option value="Ação">Ação</option>
              <option value="Romance">Romance</option>
              <option value="Terror">Terror</option>
              <option value="Suspense">Suspense</option>
              <option value="Mistério">Mistério</option>
            </select>
          </div>
          <button type="submit" className="create-book-button">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
