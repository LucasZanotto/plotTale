import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Book = () => {
  const { id } = useParams(); // Pega o ID do livro da URL corretamente
  const [livro, setLivro] = useState(null); // Estado para o livro
  const [novoConteudo, setNovoConteudo] = useState(""); // Estado para o conteúdo a ser criado

  // Recupera o author_id e authorName do localStorage
  const authorId = localStorage.getItem("authorId");
  const authorName = localStorage.getItem("authorName");

  // Função para buscar o livro e seus conteúdos
  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/books/${id}`);
        setLivro(response.data); // Agora o livro inclui os conteúdos
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      }
    };

    fetchLivro();
  }, [id]);

  // Função para enviar novo conteúdo ao backend
  const handleEnviarConteudo = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/contents`, {
        content: novoConteudo,
        author_id: authorId, // Usando o author_id do localStorage
        book_id: id,
      });
      // Atualiza a lista de conteúdos com o novo conteúdo
      setLivro({
        ...livro,
        contents: [...livro.contents, response.data],
      });
      setNovoConteudo(""); // Limpa o campo de texto após enviar
    } catch (error) {
      console.error("Erro ao criar o conteúdo:", error);
    }
  };

  if (!livro) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <h1>{livro.title}</h1>
      {console.log(livro.contents)}
      {/* Lista de conteúdos */}
      {livro.contents.map((conteudo) => (
        <div
          key={conteudo.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            width: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p>{conteudo.content}</p>
          {/* Verifica se o autor existe antes de tentar acessar o nome */}
          <p style={{ textAlign: "right", fontStyle: "italic" }}>
            por: {conteudo.author ?? conteudo.author.name}
          </p>
        </div>
      ))}

      {/* Card para criar novo conteúdo */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginTop: "20px",
          width: "100%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Criar novo conteúdo</h3>
        <textarea
          value={novoConteudo}
          onChange={(e) => setNovoConteudo(e.target.value)}
          placeholder="Escreva seu conteúdo aqui..."
          style={{ width: "100%", padding: "10px", fontSize: "16px", marginBottom: "10px" }}
        />
        <button
          onClick={handleEnviarConteudo}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Book;
