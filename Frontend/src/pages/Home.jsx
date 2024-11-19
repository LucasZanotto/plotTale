import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const Home = () => {
  const [livros, setLivros] = useState([]);
  const [filteredLivros, setFilteredLivros] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const navigate = useNavigate();

  // Busca os livros na API
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books");
        setLivros(response.data);
        setFilteredLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    fetchLivros();
  }, []);

  // Atualiza os livros filtrados com base no texto e no gênero
  useEffect(() => {
    let livrosFiltrados = livros;

    if (searchText) {
      livrosFiltrados = livrosFiltrados.filter((livro) =>
        livro.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedGenre) {
      livrosFiltrados = livrosFiltrados.filter(
        (livro) => livro.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    setFilteredLivros(livrosFiltrados);
  }, [searchText, selectedGenre, livros]);

  // Gêneros disponíveis
  const genres = ["Ação", "Romance", "Terror", "Suspense", "Mistério"];

  // Handle de seleção de gênero
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre === selectedGenre ? "" : genre); // Desseleciona o gênero se já estiver selecionado
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <Header />

      {/* Área fixa para input e filtros */}
      <div
        style={{
          display: "flex",
          paddingLeft: "65vh",
          paddingRight: "65vh",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          justifyContent: "center",
          flexDirection:"column"
        }}
      >
        <input
          type="text"
          placeholder="Buscar livros..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px", // Tamanho fixo
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginTop:"50px",
            marginBottom: "10px",
          }}
        />

        {/* Botões de filtro por gênero */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                backgroundColor: selectedGenre === genre ? "#007bff" : "#f8f9fa",
                color: selectedGenre === genre ? "#fff" : "#000",
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de livros com rolagem */}
      <div
        style={{
          flex: 0,
          justifyContent: "center",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {filteredLivros.length > 0 ? (
          filteredLivros.map((livro) => (
            <div
              key={livro.id}
              onClick={() => navigate(`/books/${livro.id}`)}
              style={{
                cursor: "pointer",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                width: "20vh",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <h3>{livro.title}</h3>
            </div>
          ))
        ) : (
          <p style={{ width: "100%", textAlign: "center" }}>Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
