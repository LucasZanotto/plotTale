import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./Book.css";

const Book = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [novoConteudo, setNovoConteudo] = useState("");
  const navigate = useNavigate();
  const authorId = localStorage.getItem("authorId");

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/books/${id}`
        );
        setLivro(response.data);
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      }
    };

    fetchLivro();
  }, [id]);

  const handleEnviarConteudo = async () => {
    if (!authorId) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/contents`, {
        content: novoConteudo,
        author_id: authorId,
        book_id: id,
      });

      const newContent = response.data;

      const authorResponse = await axios.get(
        `http://localhost:8000/api/authors/${newContent.author_id}`
      );
      newContent.author = authorResponse.data;

      setLivro((prevLivro) => ({
        ...prevLivro,
        contents: [...prevLivro.contents, newContent],
      }));

      setNovoConteudo("");
    } catch (error) {
      console.error("Erro ao criar o conteúdo:", error);
    }
  };

  if (!livro) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="book-container">
      <Header />
      <div className="book-title">
        <h1>{livro.title}</h1>
      </div>
      <div>
        {livro.contents.map((conteudo) => (
          <div key={conteudo.id} className="content-card">
            <p>{conteudo.content}</p>
            <p className="content-author">
              por:{" "}
              {conteudo.author ? conteudo.author.name : "Processando autor..."}
            </p>
          </div>
        ))}
      </div>
      <div className="content-form">
        <h3>Criar novo conteúdo</h3>
        <textarea
          value={novoConteudo}
          onChange={(e) => setNovoConteudo(e.target.value)}
          placeholder="Escreva seu conteúdo aqui..."
          className="content-textarea"
        />
        <button onClick={handleEnviarConteudo} className="submit-button">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Book;
