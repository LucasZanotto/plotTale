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

      // Adiciona o conteúdo sem autor e busca as informações atualizadas
      const newContent = response.data;

      // Busca o autor atualizado
      const authorResponse = await axios.get(`http://localhost:8000/api/authors/${newContent.author_id}`);
      newContent.author = authorResponse.data;

      // Atualiza o estado do livro
      setLivro({
        ...livro,
        contents: [...livro.contents, newContent],
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
  <div style={{ padding: "20px", paddingTop: "80px" }}> {/* Ajuste aqui */}
    <Header />
    <h1>{livro.title}</h1>
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
        <p style={{ textAlign: "right", fontStyle: "italic" }}>
          por: {conteudo.author ? conteudo.author.name : "Processando autor..."}
        </p>
      </div>
    ))}
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
}

export default Book;
